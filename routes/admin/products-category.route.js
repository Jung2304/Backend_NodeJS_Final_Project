const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/products-category.controller.js");
const validate = require("../../validates/admin/products-category.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

// Trang products-category chính 
router.get("/", controller.index);

// Giao diện tạo danh mục [GET]
router.get("/create", controller.create);

// Gửi data danh mục về [POST]
router.post(
  "/create", 
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

module.exports = router;