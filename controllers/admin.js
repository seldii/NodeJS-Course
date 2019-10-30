const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageURL, description } = req.body;

  //immediatetly store the product
  //since there is an association created between user and product
  //we can use an extra method to create a product related to a user
  req.user
    .createProduct({
      title,
      price,
      imageURL,
      description
    })
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  //using query parameters to pass additional information
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const { productId } = req.params;
  req.user
    .getProducts({ where: { id: productId } })
    /* Product.findByPk(productId) */
    .then(products => {
      //since it returns an array we need to get the fisrt and single element of that array
      const product = products[0];
      if (!product) {
        //it is not the right for the sake of User Experience
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageURL, description } = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageURL = imageURL;
      product.description = description;
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};
