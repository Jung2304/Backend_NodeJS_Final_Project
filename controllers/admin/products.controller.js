// MODEL
const Product = require("../../models/product.model.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status)

  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active"         // để bôi xanh nút bấm
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];

  let find = {
    deleted: false 
  };

  // Nếu có yêu cầu truy vấn status thì ta mới truyền vào + nút bấm chuyển
  if(req.query.status) {
    filterStatus.forEach(item => {
      item.class = (item.status == req.query.status) ? "active" : "";   
    })
    find.status = req.query.status;
  } 

  const products = await Product.find(find);        // tạo object bên ngoài và truyền biến vào  

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus
  });
}