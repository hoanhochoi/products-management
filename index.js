const express = require("express");
const path = require('path');

const moment = require('moment');
const methodOverride = require("method-override");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const database = require("./config/database")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const systemAdmin = require("./config/system");

const bodyParser = require('body-parser')

const cookieParser = require("cookie-parser");

const session = require("express-session");

const flash = require('express-flash');




database.connect();


const app = express();

const port = process.env.PORT;

// SocketIo
const server = http.createServer(app);
const io = new Server(server); 

io.on("connection",(socket)=>{
  console.log("a user connected", socket.id);
})
// End SocketIO
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// flash

// lưu ý: cài thêm thư viện npm i cookie-parser
app.use(cookieParser("KSDFLKJDS")); // key bên trong để bảo mật thông tin
// lưu ý : cài thêm thư viện npm i express-session
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


// end flash

// tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tiny MCE

// app local variable
app.locals.prefixAdmin = systemAdmin.prefixAdmin;// sử dụng được ở mọi file pug
app.locals.moment = moment;

app.use(express.static(`${__dirname}/public`));




// app.get("/",(req,res)=>{
//     res.render("client/pages/home/index");
// });

// app.get("/products",(req,res)=>{
//     res.render("client/pages/products/lists")
// });

routeAdmin(app);
route(app); // lưu ý là nên để route ở cuối

app.get("*",(req,res)=>{ // tất cả các route không giống ở admin và clint 
  res.render("./client/pages/error/404.pug",{
    pageTitle: "404 not found"
  })
})



server.listen(port, () => {
  console.log(`app listening on port ${port}`)
})