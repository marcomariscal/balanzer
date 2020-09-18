/** Routes for authentication. */

const User = require("../models/User");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/ExpressError");
const createToken = require("../helpers/createToken");
const { validate } = require("jsonschema");
const { userAuthSchema } = require("../schemas");

router.post("/", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const validation = validate({ username, password }, userAuthSchema);

    if (!validation.valid) {
      throw new ExpressError(
        validation.errors.map((e) => e.stack),
        400
      );
    }

    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
