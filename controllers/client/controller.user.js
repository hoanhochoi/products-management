const User = require("../../models/user.model.js");
const md5 = require("md5")
// [GET] user/register
module.exports.register = (req,res)=>{
    res.render("./client/pages/user/register.pug",{
        pageTitle: "Đăng ký"
    })
}
//  [POST] user/register
module.exports.registerPost = async (req,res)=>{
    console.log(req.body);
    const existEmail = await User.findOne({
        email : req.body.email
    })
    if(existEmail){
        req.flash("error","Email đã tồn tại!")
        res.redirect('back');
        return;
    }
    req.body.password = md5(req.body.password )
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/")

}

// [GET] user/login
module.exports.login = (req,res)=>{
    res.render("./client/pages/user/login.pug",{
        pageTitle: "Đăng nhập"
    })
}
//  [POST] user/login
module.exports.loginPost = async (req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: req.body.email
    })
    if(!user){
        req.flash("error","email không tồn tại!");
        res.redirect("back")
        return ;
    }
    if(md5(password) !== user.password){
        req.flash("error","mật khẩu không đúng!")
        res.redirect("back")
        return ;
    }

    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa!")
        res.redirect("back")
        return ;
    }
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/")
}


// [GET] user/logout
module.exports.logout = (req,res)=>{
    res.clearCookie("tokenUser");
    res.redirect("/");
}