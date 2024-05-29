const md5 = require('md5');
const Account = require("../../models/accounts.model");
const Roles = require("../../models/roles.model");
const systemConfig = require("../../config/system");
const Role = require('../../models/roles.model');
// [GET] admin/account
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false,
    }
    // const records = await Account.find(find).select("fullName email"); chỉ lấy thông tin fullName và email
    const records = await Account.find(find).select("-password -token"); // lấy các thông tin trừ password và token 
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted:false,
        })
        record.role = role
         
    }
    console.log(records);
    res.render("admin/pages/accounts/index.pug",{
        pageTitle: "Trang tài khoản",
        records: records,
    })
}

// [GET] admin/account/create
module.exports.create = async (req,res)=>{
    const find = {
        deleted:false,
    }
    const roles = await Roles.find(find);
    res.render("admin/pages/accounts/create.pug",{
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}

// [POST] admin/account/createPost
module.exports.createPost = async (req,res)=>{
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted:false
    })
        if(emailExist){
            req.flash("error",`email ${req.body.email} đã tồn tại!`);
            res.redirect("back");
        }else{
            console.log(req.body);
            req.body.password = md5(req.body.password);
            const records = new Account(req.body);
            await records.save();// lưu vào trong db
            res.redirect(`${systemConfig.prefixAdmin}/account`);
        }

    

}