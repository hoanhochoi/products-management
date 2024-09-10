const User = require("../../models/user.model");
module.exports = (res) => {
    _io.once("connection", (socket) => {
        // chức năng gửi yêu cầu
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            console.log("id chính:" + myUserId);
            console.log(userId) // Id của B
            // thêm id của B vào requestFriend của A
            const existAinB = await User.findOne({
                _id: myUserId,
                requestFriends: userId, // sẽ hiểu là trong mảng requestFriend đã có id của B chưa
            })
            if (!existAinB) {
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: { requestFriends: userId }
                })
            }

            //  thêm id của A vào acceptFriend của B
            const existBinA = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if (!existBinA) {
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id: userId
                }, {
                    $push: { acceptFriends: myUserId }
                })
            }
            // lấy ra độ dài acceptFriends của B và trả về cho B
            const infoUserB = await User.findOne({
                _id: userId,
            })
            const lengthAcceptFriends = infoUserB.acceptFriends.length;
            // broadCast sẽ trả cho các user ngoại trừ user đã gửi lên
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

            // lấy info của A trả về cho B
            const infoUserA = await User.findOne({
                _id: myUserId
            }).select("fullName avatar id")

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
                userId: userId,
                infoUserA: infoUserA
            })
        })


        // chức năng hủy gửi yêu cầu
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            console.log("id chính:" + myUserId);
            console.log(userId) // Id của B
            // xóa id của B vào requestFriend của A
            const existAinB = await User.findOne({
                _id: myUserId,
                requestFriends: userId, // sẽ hiểu là trong mảng requestFriend đã có id của B chưa
            })
            if (existAinB) {
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { requestFriends: userId }
                })
            }

            //  xóa id của A vào acceptFriend của B
            const existBinA = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if (existBinA) {
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { acceptFriends: myUserId }
                })
            }
            // lấy ra độ dài acceptFriends của B và trả về cho B
            const infoUserB = await User.findOne({
                _id: userId,
            })
            const lengthAcceptFriends = infoUserB.acceptFriends.length;
            // broadCast sẽ trả cho các user ngoại trừ user đã gửi lên
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: userId,
                lengthAcceptFriends: lengthAcceptFriends
            });

        })

        // chức năng từ chối kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            console.log("id chính:" + myUserId);
            console.log(userId) // Id của B
            // xóa id của B trong requestFriend của A
            const existAinB = await User.findOne({
                _id: userId,
                requestFriends: myUserId, // sẽ hiểu là trong mảng requestFriend đã có id của B chưa
            })
            if (existAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: { requestFriends: myUserId }
                })
            }

            //  xóa id của A trong acceptFriend của B
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })
            if (existBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: { acceptFriends: userId }
                })
            }

        })

        // chức năng chấp nhận kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            console.log("id chính:" + myUserId);
            console.log(userId) // Id của B
            // xóa id của B trong requestFriend của A
            // thêm {user_id,room_chat_id} của B vào friendList của A
            const existAinB = await User.findOne({
                _id: userId,
                requestFriends: myUserId, // sẽ hiểu là trong mảng requestFriend đã có id của B chưa
            })
            if (existAinB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: ''
                        }
                    },
                    $pull: { requestFriends: myUserId }
                })
            }

            // thêm {user_id,room_chat_id} của A vào friendList của B
            //  xóa id của A trong acceptFriend của B
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriends: userId
            })
            if (existBinA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: '',
                        }
                    },
                    $pull: { acceptFriends: userId }
                })
            }

        })
    })
}