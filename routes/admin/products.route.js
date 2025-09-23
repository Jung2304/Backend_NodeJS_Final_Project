const express = require("express");
const multer = require("multer");
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter.js");
const upload = multer({ storage: storageMulter() });    

const controller = require("../../controllers/admin/products.controller.js");

// Trang products chính 
router.get("/", controller.index);

// Tính năng thay đổi trạng thái (1 sản phẩm)
router.patch("/change-status/:status/:id", controller.changeStatus);          // router động, phải truy cập bằng method patch        

// Tính năng thay đổi trạng thái (nhiều sản phẩm)
router.patch("/change-multi", controller.changeMulti); 

// Tính năng xóa sản phẩm
router.delete("/delete/:id", controller.deleteItem);

// Trang thêm mới sản phẩm (GET là để lấy ra trang giao diện tạo sản phẩm)
router.get("/create", controller.create); 

// Trang thêm mới sản phẩm 2 (POST là để gửi data về)
router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;