/** Routes for running backtests in the Shrimpy API. */

const express = require("express");
const Decimal = require("decimal.js");
const client = require("../helpers/shrimpy");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

/** GET /assets => {backtestAssets: [...exchangeAsset] } */

router.get("/", authRequired, async function (req, res, next) {
  try {
    // default exchange is "coinbasepro"
    const exchange = "coinbasepro";
    const backtestAssets = await client.getBacktestAssets(exchange);
    return res.json({ backtestAssets });
  } catch (err) {
    return next(err);
  }
});

/** GET /run => {backtestResults: {rebalancingData: [...], holdingData: [...] }} */

router.get("/run", authRequired, async function (req, res, next) {
  try {
    req.body = {
      exchange: "binance", // exchange
      rebalancePeriod: 24, // rebalancePeriod in hours
      fee: new Decimal(0.1), // fee in percent
      startTime: new Date("2020-05-19T00:00:00.000Z"), // startTime
      endTime: new Date("2020-11-02T00:00:00.000Z"), // endTime
      initialValue: new Decimal(10000), // initialValue in USD
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
