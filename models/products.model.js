const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    { 
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean,
        deletedAt: Date
    }
);
const Product = mongoose.model('Product', productSchema,"products"); // products sau giống phẩy thứ 3 là tên collection trong database

module.exports = Product;