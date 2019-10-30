const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define cartItem Model

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloqNull: false,
    primaryKey: true
  }
});
module.exports = Order;
