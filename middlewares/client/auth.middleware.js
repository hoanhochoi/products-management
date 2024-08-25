const User = require("../../models/user.model.js");
module.exports.requireAuth = async (req,res,next)=>{
    if(!req.cookies.tokenUser){ // lưu ý req.cookies phải thêm s vì có nhiều cookie
        res.redirect(`/user/login`);

    }else{
        const user = await User.findOne({
            deleted:false,
            tokenUser: req.cookies.tokenUser,
        }).select("-password");
        if(!user){
        res.redirect(`/user/login`);
        }else{
            res.locals.user = user; // biến toàn cục truy cập được file pug
            next();
        }
    }  
}