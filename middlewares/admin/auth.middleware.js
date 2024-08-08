const systemConfig = require("../../config/system.js");
const Account = require("../../models/accounts.model.js");
const Role = require("../../models/roles.model.js");
module.exports.requireAuth = async (req,res,next)=>{
    if(!req.cookies.token){ // lưu ý req.cookies phải thêm s vì có nhiều cookie
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    }else{
        const user = await Account.findOne({
            deleted:false,
            token: req.cookies.token,
        }).select("-password");
        if(!user){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }else{
            const role = await Role.findOne({_id: user.role_id}).select("title permissions");
            res.locals.role = role;
            res.locals.user = user;
            next();
        }
    }  
}