const Product = require("../../models/products.model");
const ProductCategory = require("../../models/products-category.model");
const Account = require("../../models/accounts.model.js")
const systemConfig = require("../../config/system")
const createTreeHelper = require('../../helpers/createTreeHelper.js')

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

    // sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue; // truyền vào string dùng ngoặc vuông
    }else
    sort.position = "desc"; // mặc định sẽ là vị trí giảm dần
    // end sort

    const products = await Product.find(find)
    .sort(sort) // truyền vào một object 
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    // console.log(products);
    for (const product of products) {
        // lấy ra thông tin người tạo
        const user = await Account.findOne({
            _id : product.createdBy.account_id
        });
        if(user){
            product.accountFullname = user.fullName;
        }
        // lấy ra thông tin người cập nhật gần nhất
        const updatedBy = product.updatedBy.slice(-1)[0];
        // slice -1 sẽ lấy ra mảng đảo được và truyền [0] để lấy vị trí đầu tiên
        if(updatedBy){
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id
            });
            updatedBy.accountFullname = userUpdated.fullName;
        }

    }
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
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }
    
    await Product.updateOne({_id:id}, {
        status:status,
        $push: { updatedBy: updatedBy }
    }) // https://mongoosejs.com/
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
   const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
    }    
   switch (type) {
    case "active":
        await Product.updateMany({ _id:{ $in : ids}}, { status : "active",$push: { updatedBy: updatedBy }});
    req.flash("success", `cập nhật trạng thái thành công ${ids.length} sản phẩm!`)

        break;
    case "inactive":
        await Product.updateMany({ _id:{ $in : ids}}, { status : "inactive",$push: { updatedBy: updatedBy }});
    req.flash("success", `cập nhật trạng thái thành công ${ids.length} sản phẩm!`)

        break;
    case "delete-all":
        await Product.updateMany({_id : {$in:ids}}, 
            {
                deleted:true,
                deletedBy:{
                    account_id : res.locals.user.id,
                    deletedAt: new Date()
                }
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
            await Product.updateOne({_id:id},{position:position, $push: { updatedBy: updatedBy }})
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
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
            }
        });

    res.redirect("back")

} 

// [GET] /admin/product/create



module.exports.create = async (req,res) =>{
    console.log(res.locals.user);
    const record = await ProductCategory.find({deleted:false});
    const newRecord = createTreeHelper.tree(record);
    res.render("admin/pages/products/create",{
        pageTitle:"Thêm mới sản phẩm",
        category: newRecord
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
    // if(req.file){
    // req.body.thumbnail=`/uploads/${req.file.filename}`;
    // } // đoạn code này lưu imge dưới folder uploads

    req.body.createdBy = {
        account_id: res.locals.user.id
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

    const record = await ProductCategory.find({deleted:false});
    const newRecord = createTreeHelper.tree(record);

    console.log(product)
    res.render("./admin/pages/products/edit.pug",{
        pageTitle: "Chỉnh sửa sản phẩm",
        product : product,
        category : newRecord
    })
}


//  [PATCH] admin/product/edit/:id
module.exports.editPatch = async (req,res)=>{
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);
    // if(req.file){
    // req.body.thumbnail=`/uploads/${req.file.filename}`;
    // } // upload image vào trong folder uploads mới cần
    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        }

    await Product.updateOne({_id : req.params.id},{
    ...req.body,
    $push: { updatedBy: updatedBy }
    });
    req.flash("success","Cập nhật sản phẩm thành công!");
    } catch (error) {
    req.flash("error","Cập nhật sản phẩm thất bại!") 
    }

    res.redirect(`back`);
}


//  [GET] admin/product/detail/:id
module.exports.detail = async (req,res)=>{
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const find = {
        deleted : false,
        _id : id
    }
    const product = await Product.findOne(find)
    console.log(product)
    res.render("./admin/pages/products/detail.pug",{
        pageTitle: product.title,
        product : product
    })
  } catch (error) {
    
  }
}
