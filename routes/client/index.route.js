const homeRoutes = require("./home.route");
const productRoutes = require("./products.route");

module.exports = (app) =>{
   app.use("/",homeRoutes);  // vì là trang chủ trang home ban đầu nên không có thêm /..gì cả lưu ý

    app.use("/products", productRoutes);

}