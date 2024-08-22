const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/controller.checkout.js");

route.get("/",controller.index)
route.post("/order",controller.order)
route.get("/success/:orderId",controller.successOrder)
module.exports = route;