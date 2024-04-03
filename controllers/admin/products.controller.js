// [GET] /admin/product
module.exports.products = ((req,res)=>{
    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm"
    });
})