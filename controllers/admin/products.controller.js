const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper")
const searchHelper = require("../../helpers/searchHelper")
// [GET] /admin/product
module.exports.products = async (req,res)=>{
 
    // đoạn code bộ lọc

    let filterStatus = filterStatusHelper(req.query)
    console.log(filterStatus);

    let find = {
        deleted: false
    }

    if(req.query.status) // câu lệnh nếu thêm pram vào sẽ lấy data
    {
        find.status = req.query.status;
    }


    // đoạn code tìm kiếm
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex; // monggo hỗ trợ tìm regex
    }



    const products = await Product.find(find)
    // console.log(products);
    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword : objectSearch.keyword
    });
}