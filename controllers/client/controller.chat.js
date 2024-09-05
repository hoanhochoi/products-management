const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
// [GET] chat/
module.exports.index = async (req,res)=>{
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    // socketIo
    _io.once("connection",(socket)=>{
        // dùng once khi load lại trang vẫn chỉ lưu 1
        socket.on("CLIENT_SEND_MESSAGE",async (content)=>{
            // lưu vào database
            const chat = new Chat({
                user_id : userId,
                content: content
            })
            await chat.save();

            // Trả data về client
            _io.emit("SERVER_RETURN_MESSAGE",{
                userId : userId,
                fullName : fullName,
                content: content
            })
        })

        // typing
        socket.on("CLIENT_SEND_TYPING",async (type)=>{
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                userId : userId,
                fullName: fullName,
                type: type
            })
        })
        // end typing 

      })
    //  end socketIo

    // lấy data từ database
    const chats = await Chat.find({
        deleted : false,
    })
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id : chat.user_id
        }).select("fullName");
        chat.infoUser =  infoUser;
    }
    // hết lấy data từ database
    res.render("./client/pages/chat/index.pug",{
        pageTitle: "Chat",
        chats: chats
    })
}