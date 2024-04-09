const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper")
const searchHelper = require("../../helpers/searchHelper")
const paginationHelper = require("../../helpers/pagination");
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
    // console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex; // monggo hỗ trợ tìm regex
    }


    // pagination
    
    const countProducts = await Product.countDocuments(find); // ta có hàm countDocument đếm số lượng sản phẩm
    console.log("count products "+ countProducts)
    let object = {
        currentPage:1,
        limitItems: 4
    }
    console.log(typeof(object.limit))
    let objectPagination = paginationHelper(
    object,
    req.query,
    countProducts
);
    



    
    // end pagination



    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    // console.log(products);
    res.render("admin/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm",
        products : products,
        filterStatus: filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination
    });
}