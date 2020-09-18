CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT,
    shrimpy_user_id TEXT NOT NULL UNIQUE
);

-- INSERT INTO users (username, password, email, shrimpy_user_id) VALUES
--     ('demo', 'password', 'demo@gmail.com', 'b5a152de-0a3e-4e56-b189-379bb578c1f4');