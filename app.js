const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); //express is originally exported as a function that's why we use as fn

//sequelize
const sequelize = require("./util/database");

//Import sequelize.models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

//view engine key allow us to tell express for any dynamic template use this engine to view
app.set("view engine", "ejs");
//additional setting to tell express where to find our views
app.set("views", "views");

//error controller
const errorController = require("./controllers/error");

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//configure the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//static files to be served statically
app.use(express.static(path.join(__dirname, "public")));

//register a middleware to access the user available everywhere
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user; //storing the sequelize object in the request
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

//catch all middleware to add Page not Found page
app.use(errorController.get404);

//Relate the models to each other (Association >> Look up in the documentation)
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// CASCADE >>> deletion of the user causes the deletion of the products related to the user
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

//syncs your models (defined in model file) to the db by creating tables and relations
sequelize
  .sync() //with { force: true } force to overwrite the table  during development
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Selda", email: "seldaguzel@gmail.com" });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    /* console.log(cart); */
    app.listen(3000);
  })
  .catch(err => console.log(err));
