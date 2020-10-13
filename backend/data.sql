CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT,
    shrimpy_user_id TEXT NOT NULL UNIQUE
);