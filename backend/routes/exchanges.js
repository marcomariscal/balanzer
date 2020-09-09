/** Routes for supported exchanges in the Shrimpy API. */

const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const createToken = require("../helpers/createToken");
const client = require("../helpers/shrimpy");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

/** GET / => {exchanges: [exchange, ...]} */

router.get("/", async function (req, res, next) {
  try {
    const exchanges = await client.getSupportedExchanges();
    console.log(exchanges);
    return res.json({ exchanges });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
