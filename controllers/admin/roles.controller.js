const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");
const system = require("../../config/system");
const { findOne } = require("../../models/products.model");
// [GET] /admin/roles 
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("./admin/pages/roles/index.pug",{
        pageTitle: "Nhóm quyền",
        records:records
    })

}
// [GET] /admin/roles/create
module.exports.create = async  (req,res)=>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("./admin/pages/roles/create.pug",{
        pageTitle: "Tạo nhóm quyền"
    })
}

// [POST] /admin/roles/create
module.exports.createPost = async  (req,res)=>{
   const record = new Role(req.body);
   record.save();
   res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req,res)=>{
   try {
    const id = req.params.id;
    const find = {
        _id: id,
        deleted:false
    }
    const record = await Role.findOne(find);
    res.render("./admin/pages/roles/edit.pug",{
        pageTitle: "Chỉnh sửa phân quyền",
        record: record
    });
   } catch (error) {
    req.flash("error","Không có nhóm quyền này");
   res.redirect(`${systemConfig.prefixAdmin}/roles`)

}
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req,res)=>{
    const id = req.params.id;
    console.log(req.body);
    await Role.updateOne({_id:id},req.body)
    req.flash("success","cập nhật phân quyền thành công");
    res.redirect("back");
    
}