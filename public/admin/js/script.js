//! Button status
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
//! End button status


//! Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();       // logic này để kết hợp tìm kiếm + trạng thái hoạt động
    const keyword = event.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    }
    else {
      url.searchParams.delete("keyword");     // nếu không tìm kiếm thì xóa đi
    }

    window.location.href = url.href;
  });
}
//! End form search 


//! Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");            // bên index.pug đã đ/n attribute này = số trang 
      
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }

      window.location.href = url.href; 
    })
  });
}
//! End pagination


//! Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");        // từ checkboxMulti đi đến con là ô input có name='checkall'
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");
  
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {          // Nếu đã check tất cả thì
      inputsID.forEach(button => button.checked = true);
    } else {
      inputsID.forEach(button => button.checked = false);
    }
  });

  let inputsArray = Array.from(inputsID);         // convert from NodeList to Array

  inputsID.forEach(button => {
    button.addEventListener("change", () => {
      inputCheckAll.checked = inputsArray.every(button => button.checked);
    });
  });
}
//! End Checkbox Multi


//! Form Change Multi (Thay đổi trạng thái nhiều sp)
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();       // ngăn load lại trang sau khi submit form
    
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");          // những ô input checked
    
    if(inputsChecked.length > 0) {
      let ids = [];   
      inputsChecked.forEach(input => {
        ids.push(input.value);
      });
      
      const inputIds = formChangeMulti.querySelector("input[name='ids']");        // ids để gửi cho form
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất MỘT bản ghi");
    }
  });
}
//! End Form Change Multi