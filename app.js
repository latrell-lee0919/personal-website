const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");

const path = require("path");

const rootDir = require("./util/path");

const app = express();
const mongoose = require("mongoose");
const mongodb_uri = "mongodb://localhost/blogs_db";

const store = new MongoDBStore({
  uri: mongodb_uri,
  collection: "sessions",
});

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    // for testing purposes
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          email: "latrell@gmail.com",
          password: "test"
        });
        user.save();
      }
    });
  });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(methodOverride("_method"));

const homeRoutes = require("./routes/home");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blogs");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // for testing
const User = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// testing sessions stuff
// app.use((req, res, next) => {
// if (!req.session.user) {
// return next();
// }
// User.findById(req.session.user._id)
// .then(user => {
// req.user = user;
// next();
// })
// .catch(err => console.log(err));
// });

app.use("/", homeRoutes.routes);
app.use("/", authRoutes.routes);
app.use("/contact", contactRoutes.routes);
app.use("/blogs", blogRoutes.routes);

app.use("/admin", adminRoutes.routes);
app.use("/users", userRoutes.routes); // for testing

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    heading: "Wrong page?",
    path: "",
    isAdmin: req.isLoggedIn,
  })
});

app.listen(3000);
