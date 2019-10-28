const express = require("express");
const Router = express.Router();
const adminController = require("../controllers/admin");

Router.get("/add-product", adminController.getAddProduct);

//get admin products
Router.get("/products", adminController.getProducts);

//limiting middleware execution to POST request
Router.post("/add-product", adminController.postAddProduct);

module.exports = Router;
