
const Products = require("../../models/products.model");
const ProductsHelper = require("../../helpers/products.js");
const Product = require("../../models/products.model");
// [GET] /
module.exports.index = async (req,res)=>{
    // lấy sản phẩm nổi bật
    const productFeatured = await Products.find({
        featured: "1",
        deleted: "false",
        status: "active"
    }).limit(6); // limit lấy giới hạn là 6 sản phẩm
    const newProductsFeatured = ProductsHelper.priceNewProduct(productFeatured);
    console.log(newProductsFeatured);

    // lấy sản phẩm mới nhất
    const productNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort("position: desc").limit(6)
    const newProducts = ProductsHelper.priceNewProduct(productNew);

    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew : newProducts
    });
}