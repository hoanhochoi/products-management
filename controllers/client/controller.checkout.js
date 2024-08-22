const Cart = require("../../models/carts.model");
const Product = require("../../models/products.model");
const Order = require("../../models/order.model");
const productHelper = require("../../helpers/products");
// [GET] /checkout 
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
    res.render("./client/pages/checkout/index.pug",{
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}

// [POST] /checkout/order
module.exports.order = async (req,res)=>{
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({
        _id: cartId
    })
    const products  = [];
    for (const product of cart.products) {
        const objectProduct = {
            product_id : product.product_id,
            price : 0,
            discountPercentage : 0,
            quantity:  product.quantity,
        }
        const infoProduct = await Product.findOne({
            _id: product.product_id
        }).select(" discountPercentage price")
        objectProduct.price = infoProduct.price;
        objectProduct.discountPercentage = infoProduct.discountPercentage;
        products.push(objectProduct);
    }
    const orderInfo = {
        cart_id : cartId,
        userInfo: userInfo,
        products: products
    }
    // console.log(orderInfo);
    const order = new Order(orderInfo);
    // const order = new Order();
    // console.log(order);
    order.save();
    await Cart.updateOne({
        _id : cartId
    },{
        products : []
    })
    req.flash("success","đặt hàng thành công");
    res.redirect(`/checkout/success/${order.id}`);
}

// [GET] checkout/success/:orderId 
module.exports.successOrder = async (req,res) =>{
    console.log(req.params.orderId)
    const order = await Order.findOne({
        _id: req.params.orderId
    })
    // console.log(order);
    for (const product of order.products ) {
        const productInfo = await Product.findOne({
            _id : product.product_id
        }).select("title thumbnail");
        // console.log(productInfo )
        product.productInfo = productInfo;
        product.priceNew = productHelper.priceNewProductItem(product);
        product.totalPrice= product.priceNew * product.quantity;
        console.log(order.productInfo);
    }
    order.totalPrice = order.products.reduce((sum,item) => sum + item.totalPrice,0);


    res.render("./client/pages/checkout/success.pug",{
        pageTitle : "Đặt hàng thành công",
        order: order
    })
}