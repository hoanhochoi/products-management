const monggose = require("mongoose");

const rolesSchema = monggose.Schema({
    title: String,
    description: String,
    permissions:{
        type: Array,
        default: []
    },
    deleted:{
        type: Boolean,
        default: false
    },
    deleteAt : Date,

    },
    {
        timestamps:true
    }
);

const Role = monggose.model("Role",rolesSchema,"roles");
// lưu ý tham số thứ ba là tên conlection trong monggo db
module.exports = Role;