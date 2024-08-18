const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/controller.carts.js")

route.get("/",controller.index);
route.post("/add/:productId",controller.addPost);

module.exports = route;