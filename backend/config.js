/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3001;

// Shrimpy creds
const SHRIMPY_PUBLIC_KEY = process.env.SHRIMPY_MASTER_API_PUBLIC_KEY;
const SHRIMPY_PRIVATE_KEY = process.env.SHRIMPY_MASTER_API_PRIVATE_KEY;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'cfinance2-test'
// - else: 'cfinance2'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "balanzer-test";
} else {
  DB_URI = process.env.DATABASE_URL || "balanzer";
}

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  SHRIMPY_PUBLIC_KEY,
  SHRIMPY_PRIVATE_KEY,
};
