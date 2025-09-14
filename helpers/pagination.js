module.exports = (query, totalProducts) => {
  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
    skip: 0,
    pages: 0
  };

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);      
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  objectPagination.pages = Math.ceil(totalProducts / objectPagination.limitItems);

  return objectPagination;
}