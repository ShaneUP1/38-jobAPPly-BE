DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE jobs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company TEXT NOT NULL,
  applied_date TEXT NOT NULL,
  response_date TEXT,
  url TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);