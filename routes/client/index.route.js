const homeRoutes = require("./home.route");
const productRoutes = require("./products.route");
const CategoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) =>{
    // vì bên client hầu như nào cũng dùng nên code như này cho tiện
    app.use(CategoryMiddleware.category); // dùng như này thì tất cả các app không cần thêm mỗi middleware nữa
   app.use("/",homeRoutes);  // vì là trang chủ trang home ban đầu nên không có thêm /..gì cả lưu ý

    app.use("/product", productRoutes);

}