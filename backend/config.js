/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 5000;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'cfinance2-test'
// - else: 'cfinance2'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "cfinance2-test";
} else {
  DB_URI = process.env.DATABASE_URL || "cfinance2";
}

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
};
