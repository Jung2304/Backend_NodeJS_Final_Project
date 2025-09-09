const express = require("express");
const router = express.Router();      // mini Express app just for routing

const controller = require("../../controllers/client/products.controller.js");

// không cần /products mà chỉ cần / -> gọi là trang products chính. Sau này sẽ có /edit là chỉnh sửa sản phẩm, /delete là xóa,... 
router.get("/", controller.index);       // controller.index vì phải đợi user access đúng route mới thực hiện

module.exports = router;      // make this router available outside this file.