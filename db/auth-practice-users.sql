DROP DATABASE IF EXISTS auth-practice-users;
CREATE DATABASE auth-practice-users;

\c auth-practice-users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);

INSERT INTO users (username, password_digest)
  VALUES ('Tyler', 'password'), ('Shannon', 'password1'), ('Richard', 'password2');
