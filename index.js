const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();     // cài package dotenv và require như này để dùng các hằng trong file .env

const routes = require("./routes/client/index.route.js");     // main route file

const port = process.env.PORT;      // cách lấy hằng số bên file .env
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

// Routes
routes(app);     // gọi hàm và truyền đối số 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
