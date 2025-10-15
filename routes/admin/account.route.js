const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller.js");

// Trang danh sách tài khoản
router.get("/", controller.index);

// Trang tạo mới tài khoản [GET]
router.get("/create", controller.create);

// Trang tạo mới tài khoản [POST]
router.post("/create", controller.createPost);

// Trang chỉnh sửa [GET]
router.get("/edit/:id", controller.edit);

// Trang chỉnh sửa [PATCH]
router.patch("/edit/:id", controller.editPatch);

// Trang phân quyền [GET]
route.get("/permissions", controller.permissions);

// Trang phân quyền [PATCH]
router.patch("/permissions", controller.permissionsPatch);


module.exports = router;