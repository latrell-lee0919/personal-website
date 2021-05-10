const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("contact", {
    pageTitle: "Contact",
    heading: "Contact Me",
    path: "/contact",
    isAdmin: req.session.isLoggedIn,
  });
});

module.exports = {
  routes: router,
};
