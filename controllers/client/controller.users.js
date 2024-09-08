const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket")
// [GET] users/not-friend
module.exports.notFriend = async (req,res)=>{
    // socket
    usersSocket(res);
    // end socket
    const userId = res.locals.user.id;
    const user = await User.findOne({
        _id: userId
    })
    const requestFriendUser = user.requestFriends;
    const acceptFriendUser = user.acceptFriends;
    const users = await User.find({
        $and: [
            {_id: {$ne : userId}}, // not equal loại id chính
            {_id: {$nin: requestFriendUser}},  // not in loại id có trong requestFrind của chính
            {_id: {$nin: acceptFriendUser}}
        ],
        
        status: "active",
        deleted: false
    }).select("id avatar fullName")
    res.render("./client/pages/users/not-friend.pug",{
        pageTitle: "Danh sách người dùng",
        users: users
    })
}