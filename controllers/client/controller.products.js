const Product = require("../../models/products.model");
const ProductCategory = require("../../models/products-category.model");
const ProductsHelper = require("../../helpers/products")
const ProductCategoryHelper = require("../../helpers/product-category");
// [GET] /product

module.exports.index = async (req,res)=>{
    const products = await Product.find({
        status : "active",
        deleted: false
    })
    .sort({position: "desc"}) // desc là giảm dần

    const newProducts = ProductsHelper.priceNewProduct(products);

    res.render("client/pages/products/lists.pug",{
    pageTitle : "Trang sản phẩm",
    products : newProducts
    });
};

// [GET] /product/detail/:slug 
module.exports.detail = async (req,res)=>{
    console.log(req.params.slugProduct);
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
    const product  = await Product.findOne(find)
     
    if(product.product_category_id){
        const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            status: "active",
            deleted: false
        });
        product.category = category;
    }
    product.newPrice = ProductsHelper.priceNewProductItem(product);
    console.log("new price:"+ product.newPrice)

    res.render("./client/pages/products/detail.pug",{
        pageTitle : product.title,
        product : product,
    })
    } catch (error) {
        res.redirect("/product")
    }
   
}


// [GET] /product/:slugCategory 
module.exports.category = async (req,res)=>{
    const slugCategory = req.params.slugCategory;
    console.log(slugCategory);
    try {
        const category = await ProductCategory.findOne({
            slug: slugCategory,
            status: "active",
            deleted: false
        })
        console.log(category)
        const listSubCategory = await ProductCategoryHelper.getSubCategory(category.id);
        const listSubCategoryId = listSubCategory.map(item => item.id);
        console.log(listSubCategoryId);
    
    
        const product = await Product.find({
            product_category_id: {$in:[category.id,...listSubCategoryId]},
            deleted: false
        }).sort({position: "desc"})
        const newProducts = ProductsHelper.priceNewProduct(product);
    
        res.render("client/pages/products/lists.pug",{
        pageTitle : category.title,
        products : newProducts
        });
    } catch (error) {
        res.redirect("back")
    }
   
}