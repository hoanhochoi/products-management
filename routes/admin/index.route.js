const dashboardRoutes = require("./dashboard.route.js"); 
const productRoutes = require("./products.route.js"); 
const systemConfig = require("../../config/system")
module.exports = (app) =>{
   const PATH_ADMIN = systemConfig.prefixAdmin;
   app.use(PATH_ADMIN+"/dashboard",dashboardRoutes); 
   app.use(PATH_ADMIN+"/product",productRoutes);

}
