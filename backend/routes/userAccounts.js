/** Routes for a user's accounts in the Shrimpy API. */

const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/User");
const client = require("../helpers/shrimpy");

const router = express.Router();

/** GET /[username] => {accounts: [account, ...]} */

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    const accounts = await client.getAccounts(user.shrimpy_user_id);
    return res.json({ accounts });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username]/[accountName]/balances => {balance: balance}
 * returns the balance of each asset in the user's account
 */

router.get(
  "/:username/:accountName/balances",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const user = await User.findOne(req.params.username);
      const accounts = await client.getAccounts(user.shrimpy_user_id);
      const account = accounts.filter(
        (a) => a.exchange === req.params.accountName
      )[0];
      const userId = user.shrimpy_user_id;
      const accountId = new Number(account.id);
      const { balances } = await client.getBalance(
        userId,
        accountId,
        req.params.date
      );
      return res.json({ balances });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username] => {accountId: accountId}
 * creates an account in the Shrimpy API
 */

router.post("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const {
      userId,
      exchangeName,
      publicKey,
      privateKey,
      passphrase,
    } = req.body;

    // link an exchange account on the Shrimpy platform
    const accountId = await client.createAccount(
      userId,
      exchangeName,
      publicKey,
      privateKey,
      passphrase
    );

    return res.json({ accountId });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username] => {message: message}
 * unlinks an account in the Shrimpy API
 */

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const { shrimpy_user_id } = User.findOne(req.params.username);
    const { shrimpyAccountId } = req.body;

    // unlink an exchange account on the Shrimpy platform
    await client.deleteAccount({
      shrimpy_user_id,
      shrimpyAccountId,
    });

    return res.json(`${shrimpyAccountId} unlinked and deleted`);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
