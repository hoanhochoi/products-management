const ProductCategory = require("../../models/products-category.model");
const creteTreeHelper = require("../../helpers/createTreeHelper");
// [GET] /
module.exports.index = async (req,res)=>{
    const productsCategory = await ProductCategory.find({deleted:false});
    const newProductsCategory = creteTreeHelper.tree(productsCategory);
    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        layoutProductsCategory: newProductsCategory
    });
}