const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(null, title, imageURL, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  //using query parameters to pass additional information
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const { productId } = req.params;

  Product.findById(productId, product => {
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
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageURL,
    price,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};
