const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/home.controller.js");

router.get("/", controller.index);          // home chính

module.exports = router;   // make this router available outside