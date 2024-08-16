const mongoose = require("mongoose");
const cartSechema = new mongoose.Schema(
    {
        user_id : String,
        products: [
            {
                product_id: String,
                quantity : Number
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("carts",cartSechema,"carts"); 
// tham số thứ 3 là tên collection trong db
module.exports = Cart ;