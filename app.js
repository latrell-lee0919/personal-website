const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const methodOverride = require("method-override");
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const multer = require('multer');
const compression = require('compression');

const accessKeyID = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const path = require("path");

const rootDir = require("./util/path");

const app = express();
const mongoose = require("mongoose");
const mongodb_uri = process.env.DB;

const store = new MongoDBStore({
  uri: mongodb_uri,
  collection: "sessions",
});

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(methodOverride("_method"));

const homeRoutes = require("./routes/home");
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // for testing
const User = require("./models/user");
const Project = require("./models/project");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({storage: fileStorage}).single('imageUrl'));
app.use('/images', express.static(path.join(rootDir, "images")));
app.use(
  session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/", homeRoutes.routes);
app.use("/", authRoutes.routes);
app.use("/contact", contactRoutes.routes);
app.use("/projects", projectRoutes.routes);

app.use("/admin", adminRoutes.routes);
app.use("/users", userRoutes.routes); // for testing

app.get("/data", (req, res) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    heading: "Wrong page?",
    path: "",
    isAdmin: req.isLoggedIn,
  })
});

app.listen(process.env.PORT || 3000);
