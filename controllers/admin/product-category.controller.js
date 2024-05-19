const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system")

// [GET] admin/product-category
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    res.render("./admin/pages/products-category/index.pug",{
        pageTitle:"Trang danh mục sản phẩm",
        records: records

    })
}

// [GET] admin/product-category/create
module.exports.create = async (req,res)=>{
    res.render("./admin/pages/products-category/create.pug",{
        pageTitle: "Trang tạo danh mục sản phẩm",
    })
}

// [POST] admin/product-category/create
module.exports.createPost = async (req,res) =>{
    if(req.body.position == ""){
        const countProductCategory = await ProductCategory.countDocuments();
        req.body.position = countProductCategory + 1;
    }else{
        req.body.positon = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    record.save();
    console.log(req.body);

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    
}