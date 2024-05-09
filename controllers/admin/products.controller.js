const Product = require("../../models/products.model");
const systemConfig = require("../../config/system")

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
    // console.log(typeof(object.limit))
    let objectPagination = paginationHelper(
    object,
    req.query,
    countProducts
);
        
    // end pagination

    const products = await Product.find(find)
    .sort({position: "desc"}) // desc là giảm dần
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
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
    
    await Product.updateOne({_id:id}, {status:status}) // https://mongoosejs.com/
    // res.send(`${status} - ${id}`)

    req.flash("success", "cập nhật trạng thái thành công!")
    
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
    req.flash("success", `cập nhật trạng thái thành công ${ids.length} sản phẩm!`)

        break;
    case "inactive":
        await Product.updateMany({ _id:{ $in : ids}}, { status : "inactive"});
    req.flash("success", `cập nhật trạng thái thành công ${ids.length} sản phẩm!`)

        break;
    case "delete-all":
        await Product.updateMany({_id : {$in:ids}}, 
            {
                deleted:true,
                deletedAt: new Date()
            });
    req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`)
            
        break;
    case "change-position":
        for (item of ids){
            let [id,position] = item.split("-");
            // lặp qua mỗi phần tử của mảng và chia id-position 
            position = parseInt(position); // đang kiểu string thành int
            console.log(id);
            console.log(position);
            await Product.updateOne({_id:id},{position:position})
            // vì vế thứ hai position nên không thể update nhiều đc 
            // phải lặp từng vòng rồi update one
        }
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

// [GET] /admin/product/create



module.exports.create = async (req,res) =>{
    res.render("admin/pages/products/create",{
        pageTitle:"Thêm mới sản phẩm"
    })
}

// [POST] /admin/product/create

module.exports.createPost = async (req,res) =>{
    // console.log(req.file); là dùng để lấy thông tin trong file

    // if(!req.body.title){
    //     req.flash("error","vui lòng nhập tiêu đề!");
    //     res.redirect("back");
    //     return;
    // }
    
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position == ""){
        const countProducts = await Product.countDocuments() ;
        req.body.position = countProducts + 1; 
    }else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
    req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    const product = new Product(req.body)

    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/product`)
    
}

//  [GET] admin/product/edit/:id
module.exports.edit = async (req,res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const find = {
        deleted : false,
        _id : id
    }
    const product = await Product.findOne(find)
    console.log(product)
    res.render("./admin/pages/products/edit.pug",{
        pageTitle: "Chỉnh sửa sản phẩm",
        product : product
    })
}


//  [PATCH] admin/product/edit/:id
module.exports.editPatch = async (req,res)=>{
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);
    if(req.file){
    req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    try {
    await Product.updateOne({_id : req.params.id},req.body);
    req.flash("success","Cập nhật sản phẩm thành công!");
    } catch (error) {
    req.flash("error","Cập nhật sản phẩm thất bại!") 
    }

    res.redirect(`back`);
}
