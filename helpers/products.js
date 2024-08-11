module.exports.priceNewProduct = (product)=>{
    const newProducts= product.map(item =>{
        item.priceNew = (item.price *(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })

    return newProducts;
}