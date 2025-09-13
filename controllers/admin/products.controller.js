const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");

//< [GET] /admin/products
module.exports.index = async (req, res) => {
  //< Biến find để tìm kiếm theo điều kiện
  let find = {
    deleted: false 
  };

  //! Bộ lọc trạng thái
  const filterStatus = filterStatusHelper(find, req.query);

  //! Tìm kiếm
  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {     
    find.title = objectSearch.regex;          
  }

  //! Phần dùng model + các logic để trích xuất dữ liệu
  const products = await Product.find(find);         

  //! Phần truyền ra view
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword              // giữ từ tìm kiếm ở ô input
  });
}