const express = require("express");
require("dotenv").config();     // cài package dotenv và require như này để dùng các hằng trong file .env

const database = require("./config/database.js");     // ./ start from current dir
database.connect();

const port = process.env.PORT;      // lấy cổng port bên file .env
const app = express(); 

const routes = require("./routes/client/index.route.js");     // main route file

app.use(express.static("public"));      // /public -> / -> các file tĩnh đều available từ root /

app.set("views", "./views");
app.set("view engine", "pug");

// Routes
routes(app);     // gọi hàm và truyền đối số 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
