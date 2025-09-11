//! File route chính, nhúng tất cả vào
const systemConfig = require("../../config/system.js");     //để dùng biến toàn cục
const dashboardRoutes = require("./dashboard.route.js");
const productRoutes = require("./products.route.js");

module.exports = (app) => {        
  const PATH_ADMIN = systemConfig.prefixAdmin;

// Route của admin luôn phải có /admin trước rồi mới sang các trang con khác -> route admin/dashboard
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

// Route admin/products
  app.use(PATH_ADMIN + "/products", productRoutes); 
} 
