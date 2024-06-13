module.exports.index = (req,res)=>{
    res.render("./admin/pages/my-account/index.pug",{
        pageTitle: "Trang tài khoản"
    })

    // res.send("oke nầy")

}