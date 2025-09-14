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

  //! Phân trang (Pagination)
  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
    skip: 0,
    pages: 0
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);      
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const totalProducts = await Product.countDocuments({deleted: false});       // đếm tổng số sản phẩm chưa bị xóa
  objectPagination.pages = Math.ceil(totalProducts / objectPagination.limitItems);
  
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