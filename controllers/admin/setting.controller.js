const system = require("../../config/system");
const SettingGeneral = require("../../models/settings-general.model");

// [GET] admin/settings/general
module.exports.general = async (req,res)=>{
    const settingGeneral = await SettingGeneral.findOne({}) // truyền vào 1 object rỗng sẽ lấy ra bản ghi đầu tiên trong db
    res.render("./admin/pages/settings/general.pug",{
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral
    })
}

// [PATCH] admin/settings/general
module.exports.generalPatch = async (req,res)=>{
    const settingGeneral = await SettingGeneral.findOne({}) // truyền vào 1 object rỗng sẽ lấy ra bản ghi đầu tiên trong db
    if(settingGeneral){
        await SettingGeneral.updateOne({_id: settingGeneral.id}, req.body);
    }else{
        const record = new SettingGeneral(req.body);
        await record.save();
    }
    req.flash("success","cập nhật cài đặt chung thành công!")
    res.redirect("back");
}