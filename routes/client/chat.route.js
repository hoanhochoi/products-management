const express = require("express")
const route = express.Router();
const controller = require("../../controllers/client/controller.chat.js");
route.get("/",controller.index);
module.exports = route;