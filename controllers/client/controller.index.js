
const Products = require("../../models/products.model");
const ProductsHelper = require("../../helpers/products.js");
const Product = require("../../models/products.model");
// [GET] /
module.exports.index = async (req,res)=>{
    const productFeatured = await Products.find({
        featured: "1",
        deleted: "false",
        status: "active"
    }).limit(6); // limit lấy giới hạn là 6 sản phẩm
    const newProducts = ProductsHelper.priceNewProduct(productFeatured);
    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        productsFeatured: newProducts
    });
}