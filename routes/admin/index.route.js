const dashboardRoutes = require("./dashboard.route.js"); 
const productRoutes = require("./products.route.js"); 
const productCategoryRoute = require("./product-category.route.js");
const rolesRoutes = require("./roles.routes.js");
const accountRoutes = require("./account.route.js");
const authRoutes = require("./auth.router.js");
const myAccountRoutes = require("./my-account.route.js");
const settingGeneralRoutes = require("./setting-route.js");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const systemConfig = require("../../config/system")


module.exports = (app) =>{
   const PATH_ADMIN = systemConfig.prefixAdmin;
   app.use(PATH_ADMIN+"/dashboard",authMiddleware.requireAuth,dashboardRoutes); 
   app.use(PATH_ADMIN+"/product",authMiddleware.requireAuth,productRoutes);
   app.use(PATH_ADMIN+"/product-category",authMiddleware.requireAuth,productCategoryRoute);
   app.use(PATH_ADMIN+"/roles",authMiddleware.requireAuth,rolesRoutes);
   app.use(PATH_ADMIN+"/account",authMiddleware.requireAuth,accountRoutes);
   app.use(PATH_ADMIN+"/auth",authRoutes);
   app.use(PATH_ADMIN+"/my-account",authMiddleware.requireAuth,myAccountRoutes)
   app.use(PATH_ADMIN+"/settings",authMiddleware.requireAuth,settingGeneralRoutes);

}

