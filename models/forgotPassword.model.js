const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp : String,
        expireAt:{
            type : Date,
            expires: 180 
            // 180 giây bằng 3 phút
        }
    },
    {
        timestamps: true,
    }
);

const ForgotPassword = mongoose.model("ForgotPassword",forgotPasswordSchema,"forgot-password");
module.exports = ForgotPassword;