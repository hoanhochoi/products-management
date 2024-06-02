const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model.js");
module.exports.requireAuth = async (req,res,next)=>{
    if(!req.cookies.token){ // lưu ý req.cookies phải thêm s vì có nhiều cookie
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    }else{
        const user = await Account.findOne({
            deleted:false,
            token: req.cookies.token,
        })
        if(!user){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }else{
            next();
        }
    }  
}