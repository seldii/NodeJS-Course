const express = require("express");
const Router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/shop",
    hasProduct: products.length > 0,
    addProductCSS: true,
    activeShop: true
  });
});

module.exports = Router;
