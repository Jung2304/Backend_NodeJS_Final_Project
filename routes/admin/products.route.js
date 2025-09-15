const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/products.controller.js");

// Trang products chính 
router.get("/", controller.index);

// Trang thay đổi trạng thái
router.patch("/change-status/:status/:id", controller.changeStatus);          // router động, phải truy cập bằng method patch        



module.exports = router;