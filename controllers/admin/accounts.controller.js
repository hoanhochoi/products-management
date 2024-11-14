const md5 = require('md5');
const Account = require("../../models/accounts.model");
const Roles = require("../../models/roles.model");
const systemConfig = require("../../config/system");
const Role = require('../../models/roles.model');
const filterStatusHelper = require("../../helpers/filterStatusHelper");
const searchHelper = require("../../helpers/searchHelper");
// const sortHelper = require("../../helpers/")
// [GET] admin/account
module.exports.index = async (req, res) => {
    // đoạn code bộ lọc
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find['status'] = req.query.status;
    }
    // đoạn code tìm kiếm
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.fullName = objectSearch.regex;
    }

    // const records = await Account.find(find).select("fullName email"); chỉ lấy thông tin fullName và email
    const records = await Account.find(find).select("-password -token"); // lấy các thông tin trừ password và token 
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false,
        })
        record.role = role

    }
    console.log(records);
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: records,
        filterStatus: filterStatus,
    })
}

// [GET] admin/account/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false,
    }
    const roles = await Roles.find(find);
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}

// [POST] admin/account/createPost
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if (emailExist) {
        req.flash("error", `email ${req.body.email} đã tồn tại!`);
        res.redirect("back");
    } else {
        console.log(req.body);
        req.body.password = md5(req.body.password);
        const records = new Account(req.body);
        await records.save();// lưu vào trong db
        res.redirect(`${systemConfig.prefixAdmin}/account`);
    }



}

// [GET] admin/account/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false,
    };

    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted: false,
        });
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles,
        })
    } catch (error) {
        res.redirect(`${systemConfig}/account`);
    }
}

// [PATCH] admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id: { $ne: id }, // {$ne} nghĩa là not equal không bằng id loại trừ id đang muốn sửa
        email: req.body.email,
        deleted: false
    })
    if (emailExist) {
        req.flash("error", `email ${req.body.email} đã tồn tại rồi!`);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password // xóa một thuộc tính password trong object
        }
        console.log(req.body);
        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "cập nhật tài khoản thành công!")
    }
    res.redirect("back")

}

// [PATCH] admin/account/changeStatus/:status/:id?_method=PATCH
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;
        await Account.updateOne({
            _id: id
        }, {
            status: status
        }
        )
        res.redirect("back")
        req.flash("success", "cập nhật trạng thái thành công!");
    } catch (error) {
        res.redirect("back")
    }

}


