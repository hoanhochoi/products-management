const ProductCategory = require("../../models/products-category.model");
const creteTreeHelper = require("../../helpers/createTreeHelper");
module.exports.category = async (req,res,next)=>{
    const productsCategory = await ProductCategory.find({deleted:false});
    const newProductsCategory = creteTreeHelper.tree(productsCategory);
    res.locals.layoutProductsCategory = newProductsCategory;// lưu ý locals phải có s vì số nhiều có nhiều mà
    next();
}