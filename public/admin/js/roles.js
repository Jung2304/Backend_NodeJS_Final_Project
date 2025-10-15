//! Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");        // những thẻ tr có data-name

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.getAttribute("input");      // ô input là ô hidden để lưu id
      
      if (name == "id") {
        inputs.forEach((input) => {      // lấy ra được các ô id rồi thì loop và lấy gtri, sau đó push vào mảng
          const id = input.value;     
          permissions.push({            // lưu id và permissions
            id: id,
            permissions: []
          });
        });
      } else {
        inputs.forEach((input, index) => {          // index 0 là cột 1, index 1 là cột 2
          const checked = input.checked;    
          
          if (checked) {
            permissions[index].permissions.push(name);          // permissions[0] là cột 1 = qtv, lấy mảng permissions của qtv và push thêm những quyền đã check
          }
        });
      }
    });

    //< Gửi form lên BE
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector("#form-change-permissions");
      const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
      inputPermissions.value = JSON.stringify(permissions);       // sẽ hiển thị dưới dạng chuỗi -> chuyển sang json và gán
      formChangePermissions.submit();
    }
  });
}
//! End Permissions


//! View Permissions 
//> Bên code Pug FE sẽ tạo thẻ div ẩn, lưu những data BE truyền về: div(data-records=records)
const dataRecords = document.querySelector("[data-records]");

if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("[data-records]"));       // lấy một mảng data JS
  const tablePermissions = document.querySelector("[table-permissions]");

  records.forEach((record,index) => {
    const permissions = record.permissions;

    permissions.forEach(permission => {
      const row = tablePermissions.querySelectorAll(`[data-name="${permission}"]`);     // Hàng có permission tương ứng permission đc cho phép
      const inputs = row.querySelectorAll("input")[index];        // những ô input tương ứng với index đó
      
      inputs.checked = true;
    });
  });
}
//! End View Permissions