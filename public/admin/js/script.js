// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");

if(buttonsStatus.length > 0) {         // ktra nếu tồn tại thì mới thêm logic -> tối ưu 
  let url = new URL(window.location.href);      // hàm URL cho phép ta phân tích URL

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status); 
      }
      else {
        url.searchParams.delete("status");
      }
      
      window.location.href = url.href;        // chuyển hướng
    });
  });
}
// End button status
