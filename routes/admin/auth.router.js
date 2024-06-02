const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller.js");
const authValidate = require("../../validates/admin/auth.validate.js");
const { validate } = require("../../models/accounts.model.js");
router.get("/login",controller.login);

router.post(
    "/login",
    authValidate.loginPost,
    controller.loginPost);

router.get("/logout",controller.logout);
module.exports = router;