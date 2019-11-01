const mongoDb = require("mongodb");
//import the function which allow us to access the database
const getDb = require("../util/database").getDb;

class Product {
  constructor(id, title, price, imageURL, description) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    this._id = new mongoDb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then(result => console.log("product added"))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongoDb.ObjectId(productId) })
      .next()
      .then(product => {
        console.log("product", product);
        return product;
      })
      .catch(err => console.log(err));
  }
}

//Define Product Model
/* const Product = sequelize.define("product", {
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
}); */
module.exports = Product;
