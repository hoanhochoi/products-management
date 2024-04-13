const express = require("express");

const methodOverride = require("method-override");
require("dotenv").config();

const database = require("./config/database")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const systemAdmin = require("./config/system");

const bodyParser = require('body-parser')

const cookieParser = require("cookie-parser");

const session = require("express-session");

const flash = require('express-flash')



database.connect();


const app = express();

const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views","./views");
app.set("view engine","pug");

// flash

// lưu ý: cài thêm thư viện npm i cookie-parser
app.use(cookieParser("KSDFLKJDS")); // key bên trong để bảo mật thông tin
// lưu ý : cài thêm thư viện npm i express-session
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// end flash
// app local variable
app.locals.prefixAdmin = systemAdmin.prefixAdmin;// sử dụng được ở mọi file pug
app.use(express.static("public"));




// app.get("/",(req,res)=>{
//     res.render("client/pages/home/index");
// });

// app.get("/products",(req,res)=>{
//     res.render("client/pages/products/lists")
// });

routeAdmin(app);
route(app); // lưu ý là nên để route ở cuối



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})