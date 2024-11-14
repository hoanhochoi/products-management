
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