const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper")
const searchHelper = require("../../helpers/searchHelper")
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/product
module.exports.products = async (req,res)=>{
 
    // đoạn code bộ lọc

    let filterStatus = filterStatusHelper(req.query)
    // console.log(filterStatus);

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
    // console.log("count products "+ countProducts)
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

// [PATCH] /adimin/products/change-status/:status/:id 
module.exports.changeStatus = async (req,res) =>{

    const status = req.params.status;
    const id = req.params.id;
    // req.query là dùng để truy cập sau dấu hỏi chấm
    // req.params là dùng để truy cập đến / động ví dụ : "/:id"
    
    await Product.updateOne({_id:id},{status:status}) // https://mongoosejs.com/
    // res.send(`${status} - ${id}`)
    res.redirect("back"); // dọc tài liệu https://expressjs.com/en/5x/api.html#res.redirect
    // https://www.npmjs.com/package/method-override
}

// [PATCH] /adimin/products/change-multi
module.exports.changeMulti = async (req,res) =>{

   const type = req.body.type;
   const ids = req.body.ids.split(", "); // split là chuyển string -> arr có cùng ngăn cách là ", "
   console.log(type);
   console.log(ids)

   switch (type) {
    case "active":
        await Product.updateMany({ _id:{ $in : ids}}, { status : "active"});
        break;
    case "inactive":
        await Product.updateMany({ _id:{ $in : ids}}, { status : "inactive"});
        break;
   
    default:
        break;
   }
   res.redirect("back")

};

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req,res) =>{
    const id = req.params.id;
    // xóa cứng
    // await Product.deleteOne({_id: id}); // lưu ý phải để trong {}
    
    // xóa mềm
    await Product.updateOne({_id:id}
        ,{ deleted: true,
            deletedAt: new Date()
        });

    res.redirect("back")

} 