console.log("oke di vao cart")
const inputQuantity = document.querySelectorAll("input[name='quantity']")
if(inputQuantity.length > 0){
    inputQuantity.forEach(input =>{
        input.addEventListener("change",(e)=>{
            const productId = input.getAttribute("product-id")
            const quantity = input.value;
            // const quantity = input.getAttribute("value") // nếu như này sẽ không lấy được data đã thay đổi mà chỉ ban đầu
            console.log(productId);
            console.log(quantity)
            window.location.href = `cart/update/${productId}/${quantity}`;
        })
    })
}