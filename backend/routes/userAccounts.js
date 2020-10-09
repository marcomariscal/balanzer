/** Routes for a user's accounts in the Shrimpy API. */

const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const { ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/User");
const client = require("../helpers/shrimpy");
const dayjs = require("dayjs");
const delay = require("../helpers/delay");

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

/** GET /[username]/[accountId]/balances => {balance: balance}
 * returns the balance of each asset in the user's account
 */

router.get("/:username/:accountId", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const user = await User.findOne(req.params.username);
    const userId = user.shrimpy_user_id;
    const account = await client.getAccount(
      userId, // userId
      req.params.accountId // accountId
    );
    return res.json({ account });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username]/[accountId]/balances => {balance: balance}
 * returns the balance of each asset in the user's account
 */

router.get("/:username/:accountId/balances", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const user = await User.findOne(req.params.username);
    const userId = user.shrimpy_user_id;
    const accountId = new Number(req.params.accountId);
    let { balances } = await client.getBalance(
      userId,
      accountId,
      req.params.date
    );

    const rebalanceStrategy = await client.getStrategy(userId, accountId);

    // match balances to rebalance strategy allocations
    // map the symbol to a usd balance, creating a Map for efficient lookup later
    let rebalMap = new Map();

    for (const allo of rebalanceStrategy.allocations) {
      rebalMap.set(allo.symbol, allo.percent);
    }

    // match the rebalance strategy with available balances
    for (const bal of balances) {
      if (rebalMap.has(bal.symbol)) {
        bal.allocationPct = balMap.get(bal.symbol);
      } else {
        bal.allocationPct = 0;
      }
    }

    // get total balances usd value
    const totalBalanceUSD = balances.reduce((acc, curr) => {
      return acc + curr.usdValue;
    }, 0);

    // calculate the actual percent of total for current balances
    balances = balances.map((bal) => ({
      ...bal,
      actualPctOfTotal: ((bal.usdValue / totalBalanceUSD) * 100).toFixed(1),
    }));

    return res.json({ balances });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username]/[accountId]/balanceHistory => {balance: balance}
 * Returns the balance history of the user's account
 */

router.get(
  "/:username/:accountId/balanceHistory",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { accountId, username } = req.params;
      const timeframe = req.query.timeframe;

      let startTime;

      // figure out the timeframe based on the timeframe param
      if (timeframe === "W") {
        startTime = dayjs().add(-7, "day");
      } else if (timeframe === "Y") {
        startTime = dayjs().startOf("y");
      } else if (timeframe === "M") {
        startTime = dayjs().startOf("M");
      } else if (timeframe === "All") {
        // start time is the beginning of 2018 when user wants all data
        startTime = dayjs().startOf("y");
      } else {
        startTime = dayjs().startOf("date");
      }

      const user = await User.findOne(username);
      const userId = user.shrimpy_user_id;
      let balanceHistory = await client.getTotalBalanceHistory(
        userId,
        accountId,
        startTime
      );

      // shape data to match timeframe
      if (
        timeframe === "W" ||
        timeframe === "Y" ||
        timeframe === "M" ||
        timeframe === "All"
      ) {
        balanceHistory = balanceHistory.map((bal) => {
          return {
            date: dayjs(bal.date).format("MM/DD/YYYY"),
            usdValue: bal.usdValue,
          };
        });
      } else {
        balanceHistory = balanceHistory.map((bal) => {
          return {
            date: dayjs(bal.date).format("MM/DD/YYYY:HH"),
            usdValue: bal.usdValue,
          };
        });
      }

      return res.json({ balanceHistory });
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

/** POST /[username]/[accountId]/delete => {message: message}
 *  Unlinks an account in the Shrimpy API
 */

router.post("/:username/:accountId/delete", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    const { shrimpy_user_id } = await User.findOne(req.params.username);
    const accountId = req.params.accountId;

    // unlink an exchange account on the Shrimpy platform
    const message = await client.deleteAccount(shrimpy_user_id, accountId);
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

/**
 *
 * Rebalancing routes
 *
 */

/** GET /[username]/[accountId]/rebalancePeriod => {rebalancePeriod: rebalancePeriod}
 *  Gets the user account's rebalance period
 */

router.get(
  "/:username/:accountId/rebalancePeriod",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);

      const rebalancePeriod = await client.getRebalancePeriod(
        shrimpy_user_id,
        req.params.accountId
      );

      return res.json({ rebalancePeriod });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/[accountId]/rebalancePeriod => {rebalancePeriod: rebalancePeriod}
 *  Sets the user account's rebalance period
 */

router.post(
  "/:username/:accountId/rebalancePeriod",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);

      let { rebalancePeriod } = req.body;
      let periodHours;

      // identify rebalance period hours
      if (rebalancePeriod === "hour") {
        periodHours = 1;
      } else if (rebalancePeriod === "day") {
        periodHours = 24 * 1;
      } else if (rebalancePeriod === "week") {
        periodHours = 24 * 7;
      } else if (rebalancePeriod === "two weeks") {
        periodHours = 24 * 14;
      } else if (rebalancePeriod === "month") {
        periodHours = 24 * 30;
      } else if (rebalancePeriod === "none") {
        periodHours = 0;
      } else {
        periodHours = rebalancePeriod;
      }

      await client.setRebalancePeriod(
        shrimpy_user_id,
        req.params.accountId,
        periodHours
      );

      const rebalPeriod = await client.getRebalancePeriod(
        shrimpy_user_id,
        req.params.accountId
      );
      return res.json({ rebalancePeriod: rebalPeriod });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/[accountId]/rebalance => {message: message}
 * Queues a rebalance according to the user's allocations for the specified account
 */

router.post(
  "/:username/:accountId/rebalance",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);
      const accountId = req.params.accountId;

      const message = await client.rebalance(shrimpy_user_id, accountId);
      return res.json({ message });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /[username]/[accountId]/rebalanceStrategy => {message: message}
 *  Gets the user account's rebalance strategy
 */

router.get(
  "/:username/:accountId/rebalanceStrategy",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);

      const rebalanceStrategy = await client.getStrategy(
        shrimpy_user_id,
        req.params.accountId
      );

      return res.json({ rebalanceStrategy });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/[accountId]/rebalanceStrategy => {message: message}
 *  Sets the user account's rebalance strategy
 */

router.post(
  "/:username/:accountId/rebalanceStrategy",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);

      await client.setStrategy(
        shrimpy_user_id,
        req.params.accountId,
        req.body.rebalanceStrategy
      );

      const rebalanceStrategy = await client.getStrategy(
        shrimpy_user_id,
        req.params.accountId
      );
      return res.json({ rebalanceStrategy });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/[accountId]/clearStrategy => {message: message}
 *  Clears the user account's rebalance strategy and resets the rebalance period to 0, which means
 *  there will be no more rebalancing in the account until the user sets the rebalance settings again
 */

router.post(
  "/:username/:accountId/clearRebalanceStrategy",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { shrimpy_user_id } = await User.findOne(req.params.username);

      await client.clearStrategy(shrimpy_user_id, req.params.accountId);

      const rebalanceStrategy = await client.getStrategy(
        shrimpy_user_id,
        req.params.accountId
      );
      return res.json({ rebalanceStrategy });
    } catch (err) {
      return next(err);
    }
  }
);
module.exports = router;
