const express = require("express");
const Router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const products = [];

Router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    addProductCSS: true,
    formCSS: true,
    activeAddProduct: true
  });
});

//limiting middleware execution to POST request
Router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = Router;
exports.products = products;
