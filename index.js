const express = require("express");
const mongoose = require('mongoose');

const routes = require("./routes/client/index.route.js");     // main route file

const port = 3000;
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

// Routes
routes(app);     // gọi hàm và truyền đối số 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
