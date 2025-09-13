// MODEL
const Product = require("../../models/product.model.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
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

  //! Nếu có yêu cầu truy vấn status thì ta mới truyền vào + nút bấm chuyển
  if (req.query.status) {
    filterStatus.forEach(item => {
      item.class = (item.status == req.query.status) ? "active" : "";   
    })
    find.status = req.query.status;         // gán cho object find một key status
  } 

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
    keyword: keyword              // giữ từ tìm kiế m ở ô input
  });
}