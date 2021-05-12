const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/", userController.getUsers);

router.delete("/:id", userController.deleteUsers);

router.post("/", userController.postUser);

module.exports = {
  routes: router,
};
