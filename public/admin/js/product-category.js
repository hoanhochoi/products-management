console.log("nhúng product.category.js đây");
// các thuộc tính thì giống với file product.js nhưng để file riêng cho dễ nhìn
// change status
// phương thức patch để update
// phương thức post nên dùng với để chỉnh sửa dữ liệu form
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length>0){
    console.log(buttonChangeStatus);
    const formChangeStatus = document.querySelector("#form-change-status")
    let path = formChangeStatus.getAttribute("data-path");
    console.log(path);
    buttonChangeStatus.forEach((button,index)=>{
        button.addEventListener("click",()=>{
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status");
            const statusChange = (statusCurrent == "active"? "inactive":"active");
            path+=`/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = path;
            formChangeStatus.submit();
            })
    })    
}
// end change status


// delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("bạn có chắc muốn xóa không?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                console.log(action)
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })

}

// end delete item