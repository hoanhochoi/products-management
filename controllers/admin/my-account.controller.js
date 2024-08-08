const md5 = require('md5');
const Account = require("../../models/accounts.model");

// [Get] admin/my-account/
module.exports.index = (req,res)=>{
    res.render("./admin/pages/my-account/index.pug",{
        pageTitle: "Trang tài khoản"
    })


}

// [GET] admin/my-account/edit
module.exports.edit = (req,res)=>{
    res.render("./admin/pages/my-account/edit.pug",{
        pageTitle: "Trang cập nhật tài khoản"
    })
}

// [PATCH] admin/my-account/edit
module.exports.editPatch = async (req,res)=>{
    const id = res.locals.user.id;
    const emailExist = await Account.findOne({
        _id : {$ne:id}, // {$ne} nghĩa là not equal không bằng id loại trừ id đang muốn sửa
        email: req.body.email,
        deleted : false
    })
    if(emailExist){
        req.flash("error",`email ${req.body.email} đã tồn tại rồi!`);
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password // xóa một thuộc tính password trong object
        }
        console.log(req.body);
        await Account.updateOne({_id:id},req.body);
        req.flash("success","cập nhật thông tin tài khoản thành công!")
    }
    res.redirect("back")
}



