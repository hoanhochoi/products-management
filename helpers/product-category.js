const ProductCategory = require("../models/products-category.model")
module.exports.getSubCategory = async (parentId)=>{
    const subCategory = async (parentId)=> {
        const subs = await ProductCategory.find({
            parent_id : parentId,
            status: "active",
            deleted: false
        })
        const allSub = [...subs]; // ...sub là trải dài ra
        for (const sub of subs) {
            const child = await subCategory(sub.id);
            allSub.concat(child)
        }
        return allSub;
    }
    const result = await subCategory(parentId);
    return result;
    
}