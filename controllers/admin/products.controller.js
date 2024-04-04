const Product = require("../../models/products.model");
// [GET] /admin/product
module.exports.products = async (req,res)=>{
    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        }
    ]

    let find = {
        deleted: false
    }

    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    if(req.query.status) // câu lệnh nếu thêm pram vào sẽ lấy data
    {
        find.status = req.query.status;
    }

    const products = await Product.find(find)
    console.log(products);
    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm",
        products : products,
        filterStatus: filterStatus
    });
}