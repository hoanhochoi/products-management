// [GET] chat/
module.exports.index = (req,res)=>{
    // socketIo
    _io.on("connection",(socket)=>{
        console.log("a user connected", socket.id);
      })
    //  end socketIo
    res.render("./client/pages/chat/index.pug",{
        pageTitle: "Chat"
    })
}