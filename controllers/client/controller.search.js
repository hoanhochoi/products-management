const Product = require("../../models/products.model");
const ProductHelper = require("../../helpers/products");
// [GET] /search
module.exports.search = async (req,res)=>{
    console.log(req.query.keyword)
    const keyword = req.query.keyword;
    let newProduct = [];
    if(keyword){
        const regex = RegExp(keyword,"i");
        const product = await Product.find({
             title: regex,
             deleted: false,
             status: "active"
        })
        newProduct = ProductHelper.priceNewProduct(product);
    }
    res.render("./client/pages/search/index.pug",{
        keyword : keyword,
        pageTitle: "Kết quả tìm kiếm",
        product : newProduct
    })
}