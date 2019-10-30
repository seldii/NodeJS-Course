const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define cartItem Model

const CartItem = sequelize.define("cartItem", {
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
module.exports = CartItem;
