module.exports.registerPost = (req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error","vui lòng nhập họ tên!");
        res.redirect("back");
        return;
    }

    if(!req.body.email){
        req.flash("error","vui lòng nhập email!");
        res.redirect("back");
        return;
    }

    if(!req.body.password){
        req.flash("error","vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
        next();
}


module.exports.loginPost = (req,res,next)=>{
    if(!req.body.email){
        req.flash("error","vui lòng nhập email!");
        res.redirect("back");
        return;
    }

    if(!req.body.password){
        req.flash("error","vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
        next();
}

module.exports.forgotPasswordPost = (req,res,next)=>{
    if(!req.body.email){
        req.flash("error","vui lòng nhập email!");
        res.redirect("back");
        return;
    }
        next();
}

module.exports.resetPasswordPost = (req,res,next)=>{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(!password){
        req.flash("error","Vui lòng nhập mật khẩu");
        res.redirect("back")
        return;
    }
    if(!confirmPassword){
        req.flash("error","Vui lòng xác nhận mật khẩu");
        res.redirect("back")
        return;
    }
    if(confirmPassword !== password){
        req.flash("error","Mật khẩu không khớp!")
        res.redirect("back")
        return;
    }
    next();
}