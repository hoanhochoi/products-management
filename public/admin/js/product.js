// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]") 
// lưu ý : thuộc tính tự định nghĩa thêm dấu ngoặc []
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    console.log(path)
    console.log(formChangeStatus);


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