const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket")
// [GET] users/not-friend
module.exports.notFriend = async (req, res) => {
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
            { _id: { $ne: userId } }, // not equal loại id chính
            { _id: { $nin: requestFriendUser } },  // not in loại id có trong requestFrind của chính
            { _id: { $nin: acceptFriendUser } }
        ],

        status: "active",
        deleted: false
    }).select("id avatar fullName")
    res.render("./client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

module.exports.request = async (req, res) => {
    // socket
    usersSocket(res);
    // end socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const requestMyUser = myUser.requestFriends;
    const users = await User.find({
        _id: { $in: requestMyUser },
        status: "active",
        deleted: "false"
    }).select(" fullName id avatar")
    res.render("./client/pages/users/request.pug", {
        pageTitle: "lời mời đã gửi",
        users: users
    })
}

module.exports.accept = async (req, res) => {
    // socket
    usersSocket(res);
    // end socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const acceptFriend = myUser.acceptFriends;
    const users = await User.find({
        _id: { $in: acceptFriend },
        status: "active",
        deleted: "false"
    }).select(" fullName id avatar")
    res.render('./client/pages/users/accept.pug', {
        pageTitle: "Lời mời đã nhận",
        users: users
    })
}