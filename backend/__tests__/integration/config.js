// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../../app");
const db = require("../../db");

// global auth variable to store things for all the tests
const TEST_DATA = {};

/**
 * Hooks to insert a user, company, and job, and to authenticate
 *  the user and the company for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 */
async function beforeEachHook(TEST_DATA) {
  try {
    // login a user, get a token, store the user ID and token
    const hashedPassword = await bcrypt.hash("secret", 1);
    await db.query(
      `INSERT INTO users (username, password, email)
                  VALUES ('test', $1, 'test@test.com')`,
      [hashedPassword]
    );

    const response = await request(app).post("/login").send({
      username: "test",
      password: "secret",
    });

    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;
    TEST_DATA.currentUserId = jwt.decode(TEST_DATA.userToken).userId;

    const exchange_id = 0;

    // do the same for "exchange_accounts"
    const result = await db.query(
      "INSERT INTO exchange_accounts (exchange_id, user_id, linked_at, name) VALUES ($1, $2, $3) RETURNING *",
      [exchange_id, userId, Date.now(), "coinbase pro"]
    );

    TEST_DATA.exchangeAccount = result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM exchange_accounts");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  afterAllHook,
  afterEachHook,
  TEST_DATA,
  beforeEachHook,
};
