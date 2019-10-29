const express = require("express");
const Router = express.Router();
const shopController = require("../controllers/shop");

Router.get("/", shopController.getIndex);

Router.get("/products", shopController.getProducts);

Router.get("/products/:productId", shopController.getProductById);

Router.get("/cart", shopController.getCart);

//Add to Cart
Router.post("/cart", shopController.postCart);

//delete item from the cart
Router.post("/cart-delete-item", shopController.postCartDeleteItem);

Router.get("/orders", shopController.getOrders);

Router.get("/checkout", shopController.getCheckout);

module.exports = Router;
