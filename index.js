const express = require("express");
require("dotenv").config();     // cài package dotenv và require như này để dùng các hằng trong file .env
const systemConfig = require("./config/system.js");     // cài các biến hệ thống thành biến toàn cục
const methodOverride = require("method-override");

//! APP
const app = express(); 
app.use(methodOverride("_method"));

//! lOCAL VARIABLES
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//! DATABASE
const database = require("./config/database.js");     // ./ start from current dir
database.connect();       // kết nối database

//! PORT
const port = process.env.PORT;      // lấy cổng port bên file .env
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//! MAIN ROUTE
const routeAdmin = require("./routes/admin/index.route.js");        // dashboard of Admin  
const routeClient = require("./routes/client/index.route.js");     // main route of Client
routeAdmin(app);
routeClient(app);      

//! STATIC FILES va VIEW ENGINE
app.use(express.static("public"));      // /public -> / -> các file tĩnh đều available từ root /
app.set("views", "./views");
app.set("view engine", "pug");



