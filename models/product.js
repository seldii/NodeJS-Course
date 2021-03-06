const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//Define Product Model

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alloqNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    alloqNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    alloqNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    alloqNull: false
  },
  description: {
    type: Sequelize.STRING,
    alloqNull: false
  }
});
module.exports = Product;
