const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define cartItem Model

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloqNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});
module.exports = OrderItem;
