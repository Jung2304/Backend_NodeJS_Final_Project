//! Bộ lọc trạng thái
module.exports = (find, query) => {             // query <=> req.query bên controller truyền sang
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

  //! Nếu có yêu cầu truy vấn status thì ta mới truyền vào + nút bấm chuyển
  if (query.status) {
    filterStatus.forEach(item => {
      item.class = (item.status == query.status) ? "active" : "";   
    })
    find.status = query.status;
  }

  return filterStatus;        // return mảng
}