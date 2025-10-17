const express = require("express");
const router = express.Router();
const validate = require("../../validates/admin/auth.validate.js");
const controller = require("../../controllers/admin/auth.controller.js");

// Trang đăng nhập [GET]
router.get("/login", controller.login);

// Trang đăng nhập [POST]
router.post(
  "/login", 
  validate.loginPost,
  controller.loginPost);

// Trang đăng xuất [GET]
router.get("/logout", controller.logout);

module.exports = router;