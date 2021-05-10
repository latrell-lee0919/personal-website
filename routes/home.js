const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("home", {
    pageTitle: "Home",
    heading: "Welcome!",
    path: "/",
    isAdmin: req.session.isLoggedIn,
  });
});

module.exports = {
  routes: router,
};
