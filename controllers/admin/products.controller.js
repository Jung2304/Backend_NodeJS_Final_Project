const Product = require("../../models/product.model.js");
const systemConfig = require("../../config/system.js");

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
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort({ position: "desc" });           

  //! Phần truyền ra view
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,              // giữ từ tìm kiếm ở ô input
    pagination: objectPagination                // truyền luôn cả object ra ngoài
  });
};

//< [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  // Chờ update xong mới vẽ ra giao diện
  await Product.updateOne({ _id: id }, { status: status });

  // Flash sau khi thành công change status
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");

  res.redirect("back");
};  

//< [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");     // tách thành một mảng

  //> Sau này sẽ có nhiều type nữa
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái (Hoạt động) thành công cho ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, {status: "inactive"});
      req.flash("success", `Cập nhật trạng thái (Dừng hoạt động) thành công cho ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");         // Destructuring
        position = parseInt(position);               // Position là kiểu Number 
        await Product.updateOne({ _id: id }, {
          position: position 
        });
      }
      req.flash("success", `Đổi vị trí thành công cho ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }

  res.redirect("back");
};  

//< [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // Xóa cứng (vĩnh viễn)
  // await Product.deleteOne( { _id: id });

  // Xóa mềm
  await Product.updateOne({ _id: id }, { 
    deleted: true, 
    deletedAt: new Date() 
  });
  req.flash("success", `Xóa sản phẩm thành công!`);

  res.redirect("back");
};

//< [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

//< [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  console.log(req.file);
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  if(req.body.position == "") {       // nếu position rỗng thì tự động cộng
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }
  else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.thumbnail = `/uploads/${req.file.filename}`;     // thumbnail là ảnh user upload 

  const product = new Product(req.body);      
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
  
}