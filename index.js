const express = require("express");
require("dotenv").config();

const database = require("./config/database")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const systemAdmin = require("./config/system");



database.connect();


const app = express();

const port = process.env.PORT;

app.set("views","./views");
app.set("view engine","pug");

app.use(express.static("public"));



// app.get("/",(req,res)=>{
//     res.render("client/pages/home/index");
// });

// app.get("/products",(req,res)=>{
//     res.render("client/pages/products/lists")
// });

routeAdmin(app);
route(app);

// app local variable
app.locals.prefixAdmin = systemAdmin.prefixAdmin;// sử dụng được ở mọi file pug

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})