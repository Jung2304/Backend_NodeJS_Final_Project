const ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");

//! Helpers
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js");

//< [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  //! Sort
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  //! Bộ lọc trạng thái
  const filterStatus = filterStatusHelper(find, req.query);

  //! Tìm kiếm
  const objectSearch = searchHelper(req.query);

  if (objectSearch.keyword) {     
    find.title = objectSearch.keyword;       
  }

  //! Phân trang (Pagination)
  const total = await ProductCategory.countDocuments({deleted: false});       // đếm tổng số sản phẩm chưa bị xóa
  const objectPagination = paginationHelper(req.query, total);

  //! Phần dùng model + các logic để trích xuất dữ liệu
  const productCategory = await ProductCategory.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sort); 

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    productCategory: productCategory,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,              // giữ từ tìm kiếm ở ô input
    pagination: objectPagination                // truyền luôn cả object ra ngoài
  });
};

//< [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

//< [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);

  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const productCategory = new ProductCategory(req.body);
  await productCategory.save(); 

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

//< [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await ProductCategory.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái danh mục thành công!");

  res.redirect("back");
};

//< [PATCH] /admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");     // tách thành một mảng

  //> Sau này sẽ có nhiều type nữa
  switch (type) {
    case "active":
      await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái (Hoạt động) thành công cho ${ids.length} danh mục!`);
      break;
    case "inactive":
      await ProductCategory.updateMany({ _id: { $in: ids } }, {status: "inactive"});
      req.flash("success", `Cập nhật trạng thái (Dừng hoạt động) thành công cho ${ids.length} danh mục!`);
      break;
    case "delete-all":
      await ProductCategory.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash("success", `Xóa thành công ${ids.length} danh mục!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");         // Destructuring
        position = parseInt(position);               // Position là kiểu Number 
        await ProductCategory.updateOne({ _id: id }, {
          position: position 
        });
      }
      req.flash("success", `Đổi vị trí thành công cho ${ids.length} danh mục!`);
      break;
    default:
      break;
  }

  res.redirect("back");
};