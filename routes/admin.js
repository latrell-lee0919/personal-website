const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth');

router.get("/", isAuth, adminController.getAdminPage);

module.exports = {
  routes: router,
};
