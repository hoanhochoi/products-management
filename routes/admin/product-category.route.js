const express = require("express");
const route = express.Router();
const multer = require("multer");


const upload = multer(); // lưu file ở cloud


const validate = require("../../validates/admin/product-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
   
const controller = require("../../controllers/admin/product-category.controller");
route.get("/",controller.index);

route.get("/create",controller.create);

route.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);

route.get("/edit/:id",controller.edit);

route.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch);


route.get("/detail/:id",controller.detail) 

route.delete("/delete/:id",controller.delete);

route.patch("/change-status/:status/:id",controller.changeStatus);

module.exports = route;