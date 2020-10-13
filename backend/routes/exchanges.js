/** Routes for supported exchanges in the Shrimpy API. */

const express = require("express");
const client = require("../helpers/shrimpy");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

/** GET / => {exchanges: [exchange, ...]} */

router.get("/", authRequired, async function (req, res, next) {
  try {
    const exchanges = await client.getSupportedExchanges();
    return res.json({ exchanges });
  } catch (err) {
    return next(err);
  }
});

/** GET /:exchange/assets => {assets: [asset, ...]} */

router.get("/:exchange/assets", authRequired, async function (req, res, next) {
  try {
    const assets = await client.getExchangeAssets(req.params.exchange);
    return res.json({ assets });
  } catch (err) {
    return next(err);
  }
});

/** GET /:exchange/tickers => {ticker: [ticker, ...]} */

router.get("/:exchange/tickers", authRequired, async function (req, res, next) {
  try {
    const tickers = await client.getTicker(req.params.exchange);
    return res.json({ tickers });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
