const User = require("../../models/user.model.js");
const Cart = require("../../models/carts.model.js");
const ForgotPassword = require("../../models/forgotPassword.model.js");
const md5 = require("md5")
const generateRandomHelper = require("../../helpers/generate.js");
const sendMailHelper = require("../../helpers/sendMail.js");
const { response } = require("express");
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
    console.log(req.cookies.cartId);
    console.log(user.id);
    const cart = await Cart.findOne({
        user_id: user.id,
    });
    if(cart){
        console.log("thằng này đã có giỏ hàng")
        res.cookie("cartId",cart.id);
    }else{
        await Cart.updateOne({
            _id: req.cookies.cartId
        },{
            user_id: user.id
        })
    }
 

    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/")
}


// [GET] user/logout
module.exports.logout = (req,res)=>{
    res.clearCookie("tokenUser");
    // res.clearCookie("cartId");
    res.redirect("/");
}

// [GET] user/password/forgot
module.exports.forgotPassword = (req,res)=>{
    res.render("./client/pages/user/forgot-password.pug",{
        pageTitle: "Quên mật khẩu"
    })
}

// [POST] user/password/forgot

module.exports.forgotPasswordPost = async (req,res)=>{
    console.log(req.body);
    const email = req. body.email;
    const user = await User.findOne({
        email: email,
        deleted: false,
        status: "active"
    })
    if(!user){
        req.flash("error","email không tồn tại!");
        res.redirect("back");
        return;
    }
    const otp = generateRandomHelper.generateRandomNumber(6);
    const objForgotPassword = {
        email: email,
        otp: otp,
        expireAt : Date.now()   //(10000 là 10 giây)
    }
    const forgotPassword = new ForgotPassword(objForgotPassword);
    await forgotPassword.save();
    // nếu tồn tại email thì gửi otp viết sau
    const subject = " Mã OTP xác minh lấy lại mật khẩu";
    const html = `
        Mã xác minh là: <b style="color:pink">${otp}</b>. Thời hạn sử dụng 3 phút
    `
    sendMailHelper.sendMail(email,subject,html)
    res.redirect(`/user/password/otp?email=${email}`)
}

// [GET] user/password/otp

module.exports.otpPassword = (req,res)=>{
    const email = req.query.email;
    console.log(email);
    res.render("./client/pages/user/otp-password",{
        pageTitle: "Nhập mã otp",
        email: email
    })
}

//  [POST] user/password/otp

module.exports.otpPasswordPost =async (req,res)=>{
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await ForgotPassword.findOne({
        email: email,
        otp:otp
    })
    if(!result){
        req.flash("error","mã otp không đúng!");
        res.redirect("back")
        return;
    }
    const user = await User.findOne({
        email:email,
    })
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/user/password/reset");
}

// [GET] user/password/reset
module.exports.resetPassword = (req,res)=>{
    res.render("./client/pages/user/reset-password.pug")

}

// [Post] user/password/reset
module.exports.resetPasswordPost = async (req,res)=>{
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    console.log(tokenUser);
    await User.updateOne({
        tokenUser: tokenUser
    },{
        password: md5(password)
    })
    req.flash("success","đổi mật khẩu thành công")
    res.redirect("/");
}

// [GET] user/info

module.exports.info = async (req,res)=>{
    res.render("./client/pages/user/info",{
        pageTitle: "Thông tin tài khoản",
        
    })
}