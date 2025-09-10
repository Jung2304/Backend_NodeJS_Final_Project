const systemConfig = require("../../config/system.js");
const dashboardRoutes = require("./dashboard.route.js");

module.exports = (app) => {        
  const PATH_ADMIN = systemConfig.prefixAdmin;

// Route của admin luôn phải có /admin trước rồi mới sang các trang con khác
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
} 
