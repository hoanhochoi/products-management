const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/controller.user.js");
const validate = require("../../validates/client/register.validate.js");

route.get("/register",controller.register)
route.post("/register",validate.registerPost,controller.registerPost)

route.get("/login",controller.login)
route.post("/login",validate.loginPost,controller.loginPost)

module.exports = route;
