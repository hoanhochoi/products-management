const mongoose = require("mongoose");
const generate = require("../helpers/generate.js");
const accountSchema = new mongoose.Schema(
    {
        fullName : String,
        email: String,
        password: String,
        token : {
            type: String,
            default: generate.generateRandomString(20),
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
        deleted:{
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Account = mongoose.model("Account",accountSchema,"accounts"); 
// tham số thứ 3 là tên collection trong db
module.exports = Account;