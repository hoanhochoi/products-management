const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model.js");
const md5 = require("md5")
const systemConfig = require("../../config/system.js");
// [GET] admin/auth/login
module.exports.login = async (req,res)=>{
    if(req.cookies.token){
        const user = await Account.findOne({
            deleted:false,
            token : req.cookies.token
        })
        console.log(user);
        if(user){
            res.redirect(systemConfig.prefixAdmin+"/dashboard");
            // nếu token đúng thì sang trang dashboard nếu sai thì vào trang login
        }
        else{
            res.render("./admin/pages/auth/login.pug",{
                pageTitle: "Trang đăng nhập",
            })
        } 
    }else{
        res.render("./admin/pages/auth/login.pug",{
            pageTitle: "Trang đăng nhập",
        })
    }
   
}

// [POST] admin/auth/login

module.exports.loginPost = async (req,res)=>{

    const {email,password} = req.body; // mảng thì dùng ngoặc vuông object thì ngoặc nhọn
    const user = await Account.findOne({
        email: email,
        deleted: false
    });
    if(!user){
        req.flash("error",`Email ${email} không tồn tại`);
        res.redirect("back");
        return;
    }

    if(user.password != md5(password)){
        req.flash("error",`sai mật khẩu rồi!`);
        res.redirect("back");
        return;
    } 
    console.log(password)
    if(user.status == "inactive"){
        req.flash("error",`tài khoản đã bị khóa!`);
        res.redirect("back");
        return;
    }
    res.cookie("token",user.token);
    
    res.redirect(systemConfig.prefixAdmin+"/dashboard");
}

// [GET] admin/auth/logout
module.exports.logout = (req,res)=>{
    // tính năng đăng xuất xóa token ra khỏi cookie
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}