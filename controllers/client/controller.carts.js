const Cart = require("../../models/carts.model");
const Product = require("../../models/products.model");
const productHelper = require("../../helpers/products");
// [GET] card/
module.exports.index = async (req,res)=>{
    const cardId = req.cookies.cartId;
    const cart = await Cart.findOne({ // nếu tìm 1 cái thì chỉ dùng findOne
        _id : cardId
    })
    if(cart.products.length > 0){
        for (const item of cart.products) {
            const productInfo = await Product.findOne({
                _id : item.product_id
            }).select("thumbnail price slug title discountPercentage")
            productInfo.priceNew = productHelper.priceNewProductItem(productInfo);
            
            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity;
        }
        cart.sumPrice = cart.products.reduce((sum,item)=>sum + parseInt(item.totalPrice),0);
    }
    // console.log(cart)
    res.render("./client/pages/cart/index.pug",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}
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

// [GET] cart/delete/:id
module.exports.delete = async (req,res)=>{
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;
    await Cart.updateOne(
        {_id : cartId},
        {$pull:{products :{product_id: productId}}}
    )
    console.log("id san pham "+req.params.productId)
    req.flash("success","xoa san pham thanh cong")
    res.redirect("back")
}

// [GET] cart/update/:productId/:quantity
module.exports.update = async (req,res)=>{
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    await Cart.updateOne(
        {
            _id: cartId,
            "products.product_id" : productId
        },{
            "$set":{"products.$.quantity": quantity}
            // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects/
        })
    req.flash("success","cập nhật sản phẩm thành công")
    res.redirect("back");
}