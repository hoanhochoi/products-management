// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]") 
// lưu ý : thuộc tính tự định nghĩa thêm dấu ngoặc []
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path)
    // console.log(formChangeStatus);


    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
        const statusCurrent = button.getAttribute("data-status")
        let statusChange = statusCurrent == "active" ? "inactive":"active";
       
        const id = button.getAttribute("data-id")
        const action = path+`/${statusChange}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
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