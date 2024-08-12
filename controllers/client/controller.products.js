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

// [GET] /product/:slug 
module.exports.detail = async (req,res)=>{
    console.log(req.params.slug);
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    const product  = await Product.findOne(find)
    console.log(product)
    res.render("./client/pages/products/detail.pug",{
        pageTitle : product.title,
        product : product
    })
    } catch (error) {
        res.redirect("/product")
    }
   
}


// [GET] /product/:slugCategory 
module.exports.category = async (req,res)=>{
    const slugCategory = req.params.slugCategory;
    console.log(slugCategory);
    const category = await ProductCategory.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    })
    console.log(category)
    // const getSubCategory = async (parentId)=>{
    //     const subs = await ProductCategory.find({
    //         parent_id : parentId,
    //         status: "active",
    //         deleted: false
    //     })
    //     const allSub = [...subs]; // ...sub là trải dài ra
    //     for (const sub of subs) {
    //         const child = await getSubCategory(sub.id);
    //         allSub.concat(child)
    //     }
    //     return allSub;
    // }
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
   
}