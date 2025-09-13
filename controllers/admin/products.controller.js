const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");

//< [GET] /admin/products
module.exports.index = async (req, res) => {
  //< Biến find để tìm kiếm theo điều kiện
  let find = {
    deleted: false 
  };

  //! Bộ lọc trạng thái
  const filterStatus = filterStatusHelper(find, req.query);

  //! Nếu có yêu cầu tìm kiếm sản phẩm
  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i");       // regex để tìm kiếm keyword + không phân biệt
    find.title = regex;                 // gán cho object find một key title
  }

  //! Phần dùng model + các logic để trích xuất dữ liệu
  const products = await Product.find(find);         

  //! Phần truyền ra view
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword              // giữ từ tìm kiếm ở ô input
  });
}