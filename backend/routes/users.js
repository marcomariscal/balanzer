/** Routes for users. */

const express = require("express");
const ExpressError = require("../helpers/expressError");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");
const { validate } = require("jsonschema");
const { userNewSchema, userUpdateSchema } = require("../schemas");
const createToken = require("../helpers/createToken");
const client = require("../helpers/shrimpy");

const router = express.Router();

/** GET / => {users: [user, ...]} */

router.get("/", async function (req, res, next) {
  try {
    const users = await client.getUsers();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => {user: user} */

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {token: token} */

router.post("/", async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    const validation = validate({ username, password, email }, userNewSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
});

/** GET /permissions => {permissions: permissions}
 * Gets the permissions for the user in the Shrimpy API
 */

router.get("/:username/permissions", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const { username } = req.params;
    const user = await User.findOne(username);
    const userId = user.shrimpy_user_id;
    const keys = await client.getApiKeys(userId);
    const permissions = await client.getPermissions(userId, keys[0]);

    return res.status(201).json({ permissions });
  } catch (err) {
    return next(err);
  }
});

/** POST /permissions => {keys: keys}
 * Generates API keys in the Shrimpy API to be able to trade
 */

router.post("/:username/permissions", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const { username } = req.params;
    const user = await User.findOne(username);
    const userId = user.shrimpy_user_id;
    const keys = await client.getApiKeys(userId);
    const { account, trade } = req.body;

    // update the permissions in the Shrimpy API
    await client.setPermissions(userId, keys[0], account, trade);

    const permissions = await client.getPermissions(userId, keys[0]);

    return res.status(201).json({ permissions });
  } catch (err) {
    return next(err);
  }
});
/** PATCH /[username] {userData} => {user: updatedUser} */

router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    if ("username" in req.body) {
      throw new ExpressError(
        "You are not allowed to change username properties.",
        400
      );
    }

    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  {message: "User deleted"}  */

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const username = req.params.username;
    const { shrimpy_user_id } = User.findOne(username);

    await User.remove(username);

    // disable user in Shrimpy
    await client.disableUser(shrimpy_user_id);

    return res.json({ message: "User deleted and shrimpy user disabled" });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /  =>  {message: "all users deleted"}  */

router.delete("/", async function (req, res, next) {
  try {
    // remove in db
    const users = await User.findAll();
    for (const user of users) {
      await User.remove(user.username);
    }

    return res.json({ message: "all users deleted" });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
