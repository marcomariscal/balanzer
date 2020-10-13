/** Express app for CFinance 2.0. */

const express = require("express");

const ExpressError = require("./helpers/expressError");

const authRoutes = require("./routes/auth");
const backtestRoutes = require("./routes/backtest");
const exchangesRoutes = require("./routes/exchanges");
const usersRoutes = require("./routes/users");
const userAccountsRoutes = require("./routes/userAccounts");
const userTradesRoutes = require("./routes/userTrades");

const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());

// add logging system
app.use(morgan("tiny"));

app.use(cors());

app.use("/login", authRoutes);
app.use("/backtest", backtestRoutes);
app.use("/exchanges", exchangesRoutes);
app.use("/users", usersRoutes);
app.use("/userAccounts", userAccountsRoutes);
app.use("/userTrades", userTradesRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
