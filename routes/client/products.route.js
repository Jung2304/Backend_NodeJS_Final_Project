const express = require("express");
const router = express.Router();      // mini Express app just for routing

// không cần /products mà chỉ cần / -> gọi là trang products chính. Sau này sẽ có /edit là chỉnh sửa sản phẩm, /delete là xóa,... 
router.get("/", (req, res) => {
  res.render("client/pages/products/index.pug")     // đã set views sẵn
});

module.exports = router;      // make this router available outside this file.