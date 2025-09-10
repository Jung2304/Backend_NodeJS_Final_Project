module.exports.index = (req, res) => {        // index là trang chính của controller products
  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm"
  });
}