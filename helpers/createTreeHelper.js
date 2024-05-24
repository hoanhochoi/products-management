function createTree(arr,parentId = ""){
    const tree = [];
let count = 0;

    arr.forEach( (item)=>{

        if(item.parent_id === parentId){
            count ++;
            const newItem = item;
            newItem.index = count;
            const children = createTree(arr,item.id);
            if(children.length > 0){
                newItem.children = children;
            }
            tree.push(newItem);
        } 
    });
    return tree; // đoạn này mở dev tool mới hiển thị hết data còn terminal nhiều lúc không hiện hết
}

module.exports.tree = (arr,parentId = "")=>{
    count = 0; // để reset lại cho biến count bằng 0 như ban đầu
    const tree = createTree(arr,parentId= "");
    return tree;
}