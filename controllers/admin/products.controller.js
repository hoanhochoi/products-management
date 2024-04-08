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
    // console.log(objectSearch);

    if(objectSearch.regex){
        find.title = objectSearch.regex; // monggo hỗ trợ tìm regex
    }


    // pagination
    let objectPagination = {
        currentPage : 1,
        limitItems: 4
    };

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }
// công thức :
// vị trí bắt đầu lấy = (số trang - 1) * số lượng phần tử mỗi trang
    objectPagination.skip = ( objectPagination.currentPage - 1) * objectPagination.limitItems;


    // đếm số lượng sản phẩm
    const countProducts = await Product.countDocuments(find); // ta có hàm countDocument đếm số lượng sản phẩm
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    // Math.ceil để làm tròn số lên một đơn vị ví dụ 4.1 = 5
    console.log(totalPage);
    objectPagination.totalPage = totalPage;
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