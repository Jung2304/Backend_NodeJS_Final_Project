const express = require("express");
require("dotenv").config();     // cài package dotenv và require như này để dùng các hằng trong file .env

const database = require("./config/database.js");     // ./ start from current dir
database.connect();       // kết nối database

const port = process.env.PORT;      // lấy cổng port bên file .env
const app = express(); 

const routeAdmin = require("./routes/admin/index.route.js");        // dashboard of Admin  
const routeClient = require("./routes/client/index.route.js");     // main route of Client

app.use(express.static("public"));      // /public -> / -> các file tĩnh đều available từ root /

app.set("views", "./views");
app.set("view engine", "pug");

// Routes (gọi hàm và truyền đối số)
routeAdmin(app);
routeClient(app);      

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
