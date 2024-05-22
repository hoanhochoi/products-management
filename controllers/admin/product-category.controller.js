const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helpers/createTreeHelper");

// [GET] admin/product-category
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    };

    

    const record = await ProductCategory.find(find);
    const newRecord = createTreeHelper.tree(record);

    res.render("./admin/pages/products-category/index.pug",{
        pageTitle:"Trang danh mục sản phẩm",
        records: newRecord

    })
}

// [GET] admin/product-category/create
module.exports.create = async (req,res)=>{
    const find = {
        deleted: false
    };
   
    const record = await ProductCategory.find(find);
    const newRecord = createTreeHelper.tree(record);
    console.log(newRecord);
    res.render("./admin/pages/products-category/create.pug",{
        pageTitle: "Trang tạo danh mục sản phẩm",
        record: newRecord
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
    // console.log(req.body);

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    
    
}

// [GET] admin/produtc-category/edit/:id
module.exports.edit = async (req,res)=>{
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({_id : id,deleted: false});
    // console.log(data);

    const record = await ProductCategory.find({deleted:false});
    const newRecord = createTreeHelper.tree(record);
    console.log(newRecord);
    res.render("./admin/pages/products-category/edit.pug",{
        pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
        data: data,
        record: newRecord
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product-category`)
    req.flash("error", "sản phẩm không đúng!")
    
  }
}

// [PATCH] admin/product-category/edit/:id
module.exports.editPatch = async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    req.body.position = parseInt(req.body.position);
    await ProductCategory.updateOne({_id:id},req.body);
    res.redirect('back');
}