const homeRoutes = require("./home.route");
const productRoutes = require("./products.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route.js");
const checkoutRoutes = require("./checkout.route.js");
const userRotes = require("./user.route.js");
const chatRoute = require("./chat.route.js");
const CategoryMiddleware = require("../../middlewares/client/category.middleware");
const CartMiddleware = require("../../middlewares/client/cart.middleware");
const UserMiddleware = require("../../middlewares/client/user.middleware");
const SettingMiddleware = require("../../middlewares/client/setting.middleware.js");
const authMiddleware = require("../../middlewares/client/auth.middleware.js")


module.exports = (app) =>{
    // vì bên client hầu như nào cũng dùng nên code như này cho tiện
    app.use(CategoryMiddleware.category); // dùng như này thì tất cả các app không cần thêm mỗi middleware nữa
    app.use(CartMiddleware.cart);
    app.use(UserMiddleware.infoUser);
    app.use(SettingMiddleware.SettingGeneral);
    app.use("/",homeRoutes);  // vì là trang chủ trang home ban đầu nên không có thêm /..gì cả lưu ý
    app.use("/product", productRoutes);
    app.use("/search",searchRoutes)
    app.use("/cart",cartRoutes);
    app.use("/checkout",checkoutRoutes);
    app.use("/user",userRotes);
    app.use("/chat",authMiddleware.requireAuth,chatRoute);

}