const express = require("express");
const route = require("./routes/client/index.route");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("views","./views");
app.set("view engine","pug");



// app.get("/",(req,res)=>{
//     res.render("client/pages/home/index");
// });

// app.get("/products",(req,res)=>{
//     res.render("client/pages/products/lists")
// });
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})