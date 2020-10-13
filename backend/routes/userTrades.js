/** Routes for trading. */

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const client = require("../helpers/shrimpy");
const delay = require("../helpers/delay");
const Decimal = require("decimal.js");

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

/** GET /[username]/[account]/trades/[tradeId] => {trade: trade}
 * Gets all active trades for a user
 */

router.get(
  "/:username/:account/:tradeId/trades",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { userId, accountId } = req.body;
      const trade = await client.getTrade(
        userId,
        accountId,
        req.params.tradeId
      );
      return res.json({ trade });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/[accountId]/trades => {activeTrades: [activeTrade, ...]}
 * Creates a trade for a user
 */

router.post("/:username/:accountId/trades", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const { userId, fromSymbol, toSymbol, amount } = req.body;
    const tradeId = await client.createTrade(
      userId,
      Number(req.params.accountId),
      fromSymbol,
      toSymbol,
      new Decimal(amount),
      true // optimize routing
    );

    // delaying getting the trade info to allow for sufficient time to resolve the actual status of the trade
    delay(async () => {
      const trade = await client.getTrade(
        userId,
        req.params.accountId,
        tradeId
      );
      return res.status(201).json({ trade });
    }, 5000);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
