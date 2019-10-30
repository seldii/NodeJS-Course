const db = require("../util/database");

const Cart = require("./cart");
//import the database

module.exports = class Product {
  //the order of the parameters within constructor paranthesis matters
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }
  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageURL,description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageURL, this.description]
    );
  }

  static deleteById() {}

  //static keyword makes sure that you call fetchAll method directly on class itself
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
