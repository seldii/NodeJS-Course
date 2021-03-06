const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define Cart Model
//cart Table holds all the products from different users
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloqNull: false,
    primaryKey: true
  }
});
module.exports = Cart;
