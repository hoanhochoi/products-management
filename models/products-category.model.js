const mongoose = require("mongoose");
slug = require('mongoose-slug-updater')
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
    { 
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug:"title",
            unique: true // mục đích để không bị trùng lặp giống
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },{
        timestamps: true
    }
);
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema,"products-category"); // products sau giống phẩy thứ 3 là tên collection trong database

module.exports = ProductCategory;