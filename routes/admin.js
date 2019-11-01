const express = require("express");
const Router = express.Router();
const adminController = require("../controllers/admin");

Router.get("/add-product", adminController.getAddProduct);

//get admin products >> GET
Router.get("/products", adminController.getProducts);

//limiting middleware execution to POST request
Router.post("/add-product", adminController.postAddProduct);

//get edit product page
Router.get("/edit-product/:productId", adminController.getEditProduct);

//edit product >> POST
Router.post("/edit-product", adminController.postEditProduct);

//delete product >> POST
Router.post("/delete-product", adminController.postDeleteProduct);

module.exports = Router;
