const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class Cart {
  static addProduct(productId, productPrice) {
    //Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      //Analyze the cart if it has the product already
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === productId
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        //incremnet the quantity
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        //Add new product
        updatedProduct = { id: productId, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  //delete the product completely from the cart
  static deleteProduct(productId, productPrice) {
    //Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);

      let updatedCart = { ...cart };
      const product = updatedCart.products.find(prod => prod.id === productId);

      if (!product) {
        return;
      }
      const productQuantity = product.qty;
      updatedCart.products = updatedCart.products.filter(
        p => p.id !== productId
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQuantity;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  //decrement product quantity in the cart
  static decrementProduct(id, price) {
    //Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const cart = JSON.parse(fileContent);

      const productIndex = cart.products.findIndex(
        prod => prod.id === productId
      );
      const product = cart.products[productIndex];
      let updatedProduct;
      if (product.qty > 1) {
        //decrement the quantity
        updatedProduct = { ...product };
        updatedProduct.qty -= 1;
        cart.products = [...cart.products];
        cart.products[productIndex] = updatedProduct;
      } else if (product.qty === 1) {
        cart.products.filter(p => p.id !== id);
      }
      cart.totalPrice -= +price;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
