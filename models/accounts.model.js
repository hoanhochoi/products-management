const monggose = require("monggose");
const generate = require("../helpers/generate.js");
const accountSchema = new monggose.Schema(
    {
        fullName : String,
        email: String,
        passwords: String,
        token : {
            type: String,
            default: generate.generateRandomString(20),
        },
        phone: String,
        avatar: String,
        roles_id: String,
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

const Account = monggose.model("Account",accountSchema,"accounts"); 
// tham số thứ 3 là tên collection trong db
module.exports = Account;