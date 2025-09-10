const homeRoutes = require("./home.route.js");
const productRoutes = require("./products.route.js");

module.exports = (app) => {         // export route và tham số app ỏ file main

// Route trang chủ (home)
  app.use("/", homeRoutes);

// Route trang products
  app.use("/products", productRoutes);        // since router to products is available, we just USE
} 
