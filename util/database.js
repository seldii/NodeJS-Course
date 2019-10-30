const passwords = require("../config/passwords");
//integrating Sequelize  with mysql database
const Sequelize = require("sequelize");
//creating connection pool
const sequelize = new Sequelize("node-complete", "root", passwords.mysql, {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
