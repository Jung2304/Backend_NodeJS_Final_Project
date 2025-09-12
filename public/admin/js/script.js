// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");

if(buttonsStatus.length > 0) {         // ktra nếu tồn tại thì mới thêm logic -> tối ưu 
  let url = new URL(window.location.href);      // hàm URL cho phép ta phân tích URL vừa truyền vào

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

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();       // logic này để kết hợp tìm kiếm + trạng thái hoạt động
    const keyword = event.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword)
    }
    else {
      url.searchParams.delete("keyword");     // nếu không tìm kiếm thì xóa đi
    }

    window.location.href = url.href;
  });
}

// End form search 
