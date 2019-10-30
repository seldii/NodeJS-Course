const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define User Model

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloqNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    alloqNull: false
  },
  email: {
    type: Sequelize.STRING,
    alloqNull: false
  }
});
module.exports = User;
