const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/controller.search.js");
route.get("/",controller.search)

module.exports = route;