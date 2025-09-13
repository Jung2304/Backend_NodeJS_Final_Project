//! Nếu có yêu cầu tìm kiếm sản phẩm
module.exports = (query) => {
  let objectSearch = {
    keyword: ""
  }

  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    const regex = new RegExp(objectSearch.keyword, "i");       // regex để tìm kiếm keyword + không phân biệt
    objectSearch.regex = regex;                 // gán cho objectSearch một key regex
  }
  return objectSearch;
} 