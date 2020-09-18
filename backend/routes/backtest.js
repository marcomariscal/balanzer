/** Routes for running backtests in the Shrimpy API. */

const express = require("express");
const Decimal = require("decimal.js");
const ExpressError = require("../helpers/ExpressError");
const createToken = require("../helpers/createToken");
const client = require("../helpers/shrimpy");
const { authRequired } = require("../middleware/auth");
const { end } = require("../db");

const router = express.Router();

/** GET / => {assets: [...exchangeAsset] } */

router.get("/assets", async function (req, res, next) {
  try {
    const { exchange } = req.body;
    const backtestAssets = await client.getBacktestAssets(exchange);
    return res.json({ backtestAssets });
  } catch (err) {
    return next(err);
  }
});

/** GET / => {results: {rebalanceData: [...], holdingData: [...] }} */

router.get("/run", async function (req, res, next) {
  try {
    req.body = {
      exchange: "binance", // exchange
      rebalancePeriod: 10, // rebalancePeriod in hours
      fee: new Decimal(0.1), // fee in percent
      startTime: new Date("2018-05-19T00:00:00.000Z"), // startTime
      endTime: new Date("2018-11-02T00:00:00.000Z"), // endTime
      initialValue: new Decimal(5000), // initialValue in USD
      allocations: [
        { symbol: "BTC", percent: new Decimal(50) },
        { symbol: "ETH", percent: new Decimal(50) },
      ], // allocations
    };

    const {
      exchange,
      rebalancePeriod,
      fee,
      startTime,
      endTime,
      initialValue,
      allocations,
    } = req.body;
    const backtestResults = await client.runBacktest(
      exchange,
      rebalancePeriod,
      fee,
      startTime,
      endTime,
      initialValue,
      allocations
    );
    return res.json({ backtestResults });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
