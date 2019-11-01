const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); //express is originally exported as a function that's why we use as fn

//Import MongoDb
const mongoDbConnect = require("./util/database").mongoDbConnect;

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
app.use((req, res, next) => {
  // User.findById(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next();
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//catch all middleware to add Page not Found page
app.use(errorController.get404);

//MongoDB Connection
mongoDbConnect(() => {
  app.listen(3000);
});
