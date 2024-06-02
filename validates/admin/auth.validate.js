module.exports.loginPost = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!email){
        req.flash("error","vui lòng nhập email!");
        res.redirect("back");
        return;
    }
    if(!password){
        req.flash("error","vui lòng nhập password!");
        res.redirect("back");
        return;
    }
    next();
}