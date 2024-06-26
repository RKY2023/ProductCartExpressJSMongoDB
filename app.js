require('dotenv').config()
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const userRoutes = require("./routes/user");
// const expenseRoutes = require("./routes/expense");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findUserById('667bfdbf6b8f42ad568a48ba').then((user) => {
    req.user = new User(user.name, user.email, user.phoneNo, user.cart, user._id);
    next();
  }).catch((err) => console.log(err));
  // next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use(userRoutes);
// app.use(expenseRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // console.log(client);
  app.listen(3000);
});