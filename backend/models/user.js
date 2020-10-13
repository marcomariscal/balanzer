const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/expressError");
const client = require("../helpers/shrimpy");

const BCRYPT_WORK_FACTOR = 10;

/** Related functions for users. */

class User {
  /** authenticate user with username, password. Returns user or throws err. */

  static async authenticate(data) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, 
              password,
              email,
              shrimpy_user_id
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }

    throw new ExpressError("Invalid username or password", 401);
  }

  /** Register user with data. Returns new user data. */

  static async register(data) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There already exists a user with username '${data.username}`,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    // create shrimpy user
    const shrimpy_user_id = await client.createUser(data.username);

    if (!shrimpy_user_id)
      throw new ExpressError("Could not create user in Shrimpy");

    // create API keys in shrimpy for user management
    await client.createApiKeys(shrimpy_user_id);

    const result = await db.query(
      `INSERT INTO users 
          (username, password, email, shrimpy_user_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING username, password, email, shrimpy_user_id`,
      [data.username, hashedPassword, data.email, shrimpy_user_id]
    );

    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
      `SELECT username, email, shrimpy_user_id
        FROM users
        ORDER BY username`
    );

    return result.rows;
  }

  /** Given a username, return data about user. */

  static async findOne(username) {
    const userRes = await db.query(
      `SELECT username, email, shrimpy_user_id
        FROM users 
        WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = partialUpdate("users", data, "username", username);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    delete user.password;

    return result.rows[0];
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
      [username]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }
  }
}

module.exports = User;
