const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("links", {
    pageTitle: "Links",
    heading: "Links",
    path: "/links",
    isAdmin: req.session.isLoggedIn,
  });
});

module.exports = {
  routes: router,
};
