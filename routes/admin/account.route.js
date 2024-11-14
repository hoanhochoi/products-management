const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer(); // lưu file ở cloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validates/admin/account.validate");


const controller = require("../../controllers/admin/accounts.controller");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);
router.get("/edit/:id",controller.edit);

router.patch(
    "/edit/:id",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch);

router.patch("/change-status/:status/:id",controller.changeStatus)

module.exports = router;