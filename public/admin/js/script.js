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


//! Form Change Multi (Các thao tác với nhiều sp cùng lúc)
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();       // ngăn load lại trang sau khi submit form
    
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");          // những ô input checked
    
    const selection = event.target.elements.type.value;         // lấy ra lựa chọn

    if (selection == "") {
      alert("Vui lòng chọn thao tác trước khi áp dụng!");
      return;
    }

    if (selection == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này?");
      if (!isConfirm) {
        return;         // Nếu không confirm thì sẽ hủy toàn bộ thao tác đằng sau
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];   
      inputsChecked.forEach(input => {
        const id = input.value;

        if (selection == "change-position") {       // THĐB phải kèm theo position
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } 
        else {
          ids.push(id);
        }
      });
      
      const inputIds = formChangeMulti.querySelector("input[name='ids']");        // ids để gửi cho form
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } 
    else {
      alert("Vui lòng chọn ít nhất MỘT bản ghi");
    }
  });
}
//! End Form Change Multi


//! Delete item
const deleteButtons = document.querySelectorAll("[button-delete]");
if (deleteButtons.length > 0) {  
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

      if (isConfirm) {            // Nếu chắc chắn muốn xóa
        const id = button.getAttribute("data-id");
        
        const action = `${path}/${id}?_method=DELETE`;        // nhớ thêm _method="DELETE" vào action
        formDeleteItem.action = action;

        formDeleteItem.submit();
      }
    });
  }); 
} 
//! End Delete item


//! Show Alert (FE)
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");   
  });
}
//! End Show Alert


//! Upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];       // lấy ra bức ảnh vừa upload
    if (file) { 
      uploadImagePreview.src = URL.createObjectURL(file);       // tọa url cho ảnh trên và gắn vào src

      const deleteButton = document.querySelector("#delete-button");
      deleteButton.addEventListener("click", () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
      });
    }
  });
}

//! End Upload image