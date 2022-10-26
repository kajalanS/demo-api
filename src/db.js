const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "123",
  database: "test_db",
});

db.connect();

module.exports = db;
