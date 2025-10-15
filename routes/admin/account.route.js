const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();  
const validate = require("../../validates/admin/account.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/account.controller.js");

// Trang danh sách tài khoản
router.get("/", controller.index);

// Trang tạo mới tài khoản [GET]
router.get("/create", controller.create);

// Trang tạo mới tài khoản [POST]
router.post(
  "/create", 
  upload.single("avatar"), 
  uploadCloud.upload,
  validate.createPost, 
  controller.createPost
);

module.exports = router;