const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); //express is originally exported as a function that's why we use as fn

const expressHbs = require("express-handlebars");

app.engine(
  "handlebars",
  expressHbs({ layoutsDir: "views/layout/", defaultLayout: "main-layout" })
);
//view engine key allow us to tell express for any dynamic template use this engine to view
app.set("view engine", "handlebars");
//additional setting to tell express where to find our views
app.set("views", "views");

//routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//configure the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//static files to be served statically
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

//catch all middleware to add Page not Found page
app.use((req, res, next) => {
  res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
});

//Listen the upcoming request
app.listen(3000);
