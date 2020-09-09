const bcrypt = require("bcrypt");
const db = require("./db");

// Database DDL (for tests)
const DDL = `

  CREATE TABLE users (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL,
      email TEXT,
      shrimpy_user_id TEXT NOT NULL UNIQUE
  );

  CREATE TABLE accounts (
      exchange_account_id INTEGER PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      linked_at TIMESTAMP DEFAULT NOW(),
      name TEXT,

  );`;

async function seedData() {
  try {
    await db.query(DDL);
    const hashedPassword = await bcrypt.hash("secret", 1);
    const user = await db.query(
      `INSERT INTO users (username, password, email, shrimpy_user_id )
                  VALUES ('test', $1, 'true', 'test@gmail.com', 0)`,
      [hashedPassword]
    );
  } catch (err) {
    console.log("Something went wrong!");
    console.log(err);
    process.exit(1);
  }
}

seedData().then(() => {
  console.log("Successful seed!");
  process.exit();
});
