const Product = require("../../models/product.model.js");

// [GET] /products
module.exports.index = async (req, res) => {        // index là trang chính của controller products
// hàm find, truyền vào object -> object là các bản ghi có key status: active và deleted: false 
  const products = await Product.find({            
    status: "active",
    deleted: false
  }).sort({ position: "desc" });        

// tính toán giá mới sau giảm giá
  const newProducts = products.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(2);    // để làm tròn 2 số sau dấu phẩy
    return item;
  });

  console.log(newProducts);

  res.render("client/pages/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProducts
  });
}