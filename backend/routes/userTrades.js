/** Routes for trading. */

const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/User");
const { validate } = require("jsonschema");
const client = require("../helpers/shrimpy");
const { createTrade } = require("../helpers/shrimpy");

const router = express.Router();

/** GET /[username]/[account]/trades => {activeTrades: [activeTrade, ...]}
 * Gets all active trades for a user
 */

router.get("/:username/:account/trades", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const { userId, accountId } = req.body;
    const activeTrades = await client.getActiveTrades(userId, accountId);
    return res.json({ activeTrades });
  } catch (err) {
    return next(err);
  }
});

/** POST /[username]/[account]/trades => {activeTrades: [activeTrade, ...]}
 * Creates a trade for a user
 */

router.post("/", ensureCorrectUser, async function (req, res, next) {
  try {
    const { userId, accountId, fromSymbol, toSymbol, amount } = req.body;
    const tradeId = await createTrade(
      userId,
      accountId,
      fromSymbol,
      toSymbol,
      amount,
      true // optimize routing
    );

    return res.status(201).json({ tradeId });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
