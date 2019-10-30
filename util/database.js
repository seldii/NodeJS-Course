const mysql = require("mysql2");
const passwords = require("../config/passwords");
//creating conncetion pool managing multiple connections
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: passwords.mysql
});

module.exports = pool.promise();
