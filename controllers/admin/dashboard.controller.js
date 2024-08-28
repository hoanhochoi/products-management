const ProductCategory = require("../../models/products-category.model");
const Product = require("../../models/products.model");
const Account = require("../../models/accounts.model");
const User = require("../../models/user.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req,res)=>{
    const statistic = { 
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product:{
            total: 0,
            active: 0,
            inactive: 0,
        },
        account:{
            total: 0,
            active: 0,
            inactive: 0,
        },
        user:{
            total: 0,
            active: 0,
            inactive: 0,
        }

    }
    // Category-product
    statistic.categoryProduct.total = await ProductCategory.countDocuments({
        deleted: false,
        
    })
    statistic.categoryProduct.active = await ProductCategory.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
        deleted: false,
        status: "inactive"
    })

    // product
    statistic.product.total = await Product.countDocuments({
        deleted: false,
        
    })
    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive" 
    })
    // user
    statistic.user.total = await User.countDocuments({
        deleted: false,

    })
    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive" 
    })

    // account
    statistic.account.total = await Account.countDocuments({
        deleted: false,

    })
    statistic.account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.account.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive" 
    })
    
    console.log(statistic)

    res.render("admin/pages/dashboard/index.pug",{
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}