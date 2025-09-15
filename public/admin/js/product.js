// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = (currentStatus == "active") ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;         // /admin/products/change-status/inactive/68c12c6d58e3621f44cb2537  
      formChangeStatus.action = action;             // thuộc tính action có sẵn của html form

      formChangeStatus.submit();      // hàm submit hỗ trợ form 
    });
  });
}
// End change status