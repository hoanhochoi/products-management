const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/controller.users.js");

route.get("/not-friend",controller.notFriend)
route.get("/request",controller.request)
route.get("/accept",controller.accept)
route.get("/friends",controller.friend);

module.exports = route;