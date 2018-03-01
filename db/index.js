var pgp = require("pg-promise");
var connectionString = "postgres://localhost/auth-practice-users";
var db = pgp(connectionString);

module.exports = db;