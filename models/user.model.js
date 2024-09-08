const mongoose = require("mongoose");
const generate = require("../helpers/generate.js");
const userSchema = new mongoose.Schema(
    {
        fullName : String,
        email: String,
        password: String,
        tokenUser : {
            type: String,
            default: generate.generateRandomString(20),
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        requestFriends : Array, // lời mời dã gửi
        acceptFriends : Array, // lời mời đã nhận
        friendList: [  // danh sách bạn bè
            {
                user_id: String,
                room_chat_id: String,
            },
        ],
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

const User = mongoose.model("User",userSchema,"user"); 
// tham số thứ 3 là tên collection trong db
module.exports = User;