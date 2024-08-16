const Cart = require("../../models/carts.model");
// [POST] cart/add/productId
module.exports.addPost = async (req,res)=>{
    const productId = req.params.productId // lưu ý req. là lấy ra nhưng gì có còn res là tạo ra chưa có
    const quantity = parseInt(req.body.quantity); // lấy ra số lượng\
    const cartId = req.cookies.cartId;
    console.log(`id sản phẩm ${productId}`)
    console.log(`số lượng ${quantity}`)
    console.log(`id cart ${cartId}`)

    const cart = await Cart.findOne({
        _id : cartId
    })
    const existProductInCart = cart.products.find(item => item.product_id == productId) 
    // lưu ý hàm find này là của js không phải của mongoose và find này tìm 1 phần tử còn tìm nhiều là filter
    if(existProductInCart){
        cart.quantity += quantity;
        const quantityNew = quantity + existProductInCart.quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                "products.product_id" : productId
            },{
                "$set":{"products.$.quantity": quantityNew}
                // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects/
            })
    }else{
        const objectCart = {    
            product_id : productId,
            quantity : quantity
        }
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: {products : objectCart }
            }
        )
    }
  
    req.flash("success","đã thêm sản phẩm vào giỏ hàng thành công!")
    res.redirect("back");
}