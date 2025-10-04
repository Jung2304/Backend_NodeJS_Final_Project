const ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");

//< [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const productCategory = await ProductCategory.find(find);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    productCategory: productCategory      
  });
};

//< [GET] /admin/products-category/create
module.exports.create = async(req, res) => {
  
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

//< [POST] /admin/products-category/create
module.exports.createPost = async(req, res) => {
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