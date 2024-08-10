const mongoose = require("mongoose");
// https://www.npmjs.com/package/mongoose-slug-updater
slug = require('mongoose-slug-updater')
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    { 
        title: String,
        product_category_id:{
            type: String,
            default:""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        featured: String,
        position: Number,
        slug: {
            type: String,
            slug:"title",
            unique: true // mục đích để không bị trùng lặp giống
        },
        createdBy: {
            account_id: String,
            createdAt : {
                type: Date,
                default: Date.now
                // dùng default cho ban đầu tạo một record thôi không tác dụng với sửa
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        updatedBy: [
            {
            account_id: String,
            updatedAt: Date,
            }
        ]
    },{
        timestamps: true
    }
);
const Product = mongoose.model('Product', productSchema,"products"); // products sau giống phẩy thứ 3 là tên collection trong database

module.exports = Product;