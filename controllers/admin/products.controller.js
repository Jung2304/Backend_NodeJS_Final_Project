const Product = require("../../models/product.model.js");

//! Helpers
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js");

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

  //! Phân trang (Pagination)
  const totalProducts = await Product.countDocuments({deleted: false});       // đếm tổng số sản phẩm chưa bị xóa
  const objectPagination = paginationHelper(req.query, totalProducts);
  
  //! Phần dùng model + các logic để trích xuất dữ liệu
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);           

  //! Phần truyền ra view
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,              // giữ từ tìm kiếm ở ô input
    pagination: objectPagination                // truyền luôn cả object ra ngoài
  });
}