const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");
const system = require("../../config/system");
// [GET] /admin/product/roles 
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
// [GET] /admin/product/roles/create
module.exports.create = async  (req,res)=>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("./admin/pages/roles/create.pug",{
        pageTitle: "Tạo nhóm quyền"
    })
}

// [POST] /admin/product/roles/create
module.exports.createPost = async  (req,res)=>{
   const record = new Role(req.body);
   record.save();
   res.redirect(`${systemConfig.prefixAdmin}/roles`)
}