//! File route chính, nhúng tất cả vào
const systemConfig = require("../../config/system.js");     //để dùng biến toàn cục

const dashboardRoutes = require("./dashboard.route.js");
const productsRoutes = require("./products.route.js");
const productsCategoryRoutes = require("./products-category.route.js");
const roleRoutes = require("./role.route.js");
const authRoutes = require("./auth.route.js");

module.exports = (app) => {        
  const PATH_ADMIN = systemConfig.prefixAdmin;

// Route admin/dashboard
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

// Route admin/products
  app.use(PATH_ADMIN + "/products", productsRoutes); 

// Route admin/products-category
  app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes); 

// Route admin/role
  app.use(PATH_ADMIN + "/role", roleRoutes);

// Route admin/auth
  app.use(PATH_ADMIN + "/auth", authRoutes);
} 


