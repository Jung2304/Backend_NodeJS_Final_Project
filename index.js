require("dotenv").config();     // cài package dotenv và require như này để dùng các hằng trong file .env

const express = require("express");
const systemConfig = require("./config/system.js");     // cài các biến hệ thống thành biến toàn cục
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

//! APP
const app = express(); 
app.use(methodOverride("_method"));           // to override method like PATCH, DELETE,...
app.use(bodyParser.urlencoded({ extended: false }));     // parse application/form-urlencoded

//! lOCAL VARIABLES và STATIC FILES
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static(`${__dirname}/public`));      // /public -> / -> các file tĩnh đều available từ root /

//! DATABASE
const database = require("./config/database.js");     // ./ start from current dir
database.connect();       // kết nối database

//! PORT
const port = process.env.PORT;      // lấy cổng port bên file .env
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//! EXPRESS-FLASH
app.use(cookieParser("keyboard cat"));            // secret key to sign session ID cookie 
app.use(session({ 
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } 
}));
app.use(flash());

//! TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//! MAIN ROUTE
const routeAdmin = require("./routes/admin/index.route.js");        // dashboard of Admin  
const routeClient = require("./routes/client/index.route.js");     // main route of Client
routeAdmin(app);
routeClient(app);      

//! VIEW ENGINE
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


