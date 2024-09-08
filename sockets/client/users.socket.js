const User = require("../../models/user.model");
module.exports = (res)=>{
    _io.once("connection",(socket)=>{
        socket.on("CLIENT_ADD_FRIEND", async (userId)=>{
            const myUserId = res.locals.user.id;
            console.log("id chính:"+myUserId);
            console.log(userId) // Id của B
            // thêm id của B vào requestFriend của A
            const existAinB = await User.findOne({
                _id : myUserId,
                requestFriends: userId, // sẽ hiểu là trong mảng requestFriend đã có id của B chưa
            })
            if(!existAinB){
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id : myUserId
                },{
                    $push: {requestFriends: userId}
                })
            }

            //  thêm id của A vào acceptFriend của B
            const existBinA = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if(!existBinA){
                console.log("chưa có thì thêm vào")
                await User.updateOne({
                    _id: userId 
                },{
                    $push:{acceptFriends: myUserId}
                })
            }

        }) 
    })
}