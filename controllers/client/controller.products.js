const Product = require("../../models/products.model");
// [GET] /product

module.exports.index = async (req,res)=>{
    const products = await Product.find({
        status : "active",
        deleted: false
    })
    .sort({position: "desc"}) // desc là giảm dần

    const newProducts= products.map(item =>{
        item.priceNew = (item.price *(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })

    // console.log(products);

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