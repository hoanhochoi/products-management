// button status

const buttonStatus = document.querySelectorAll("[button-status]") // những thuộc tính tự định nghĩa thêm ngoặc vuông vào
if(buttonStatus.length>0) // kiểm tra sự trong mảng có thì mới chạy k thì thôi đỡ mất thời gian
{
let url = new URL(window.location.href);
buttonStatus.forEach(button =>{
    button.addEventListener("click",()=>{
        const status = button.getAttribute("button-status")
        if(status){
            url.searchParams.set("status",status)
        }
        else{
            url.searchParams.delete("status")
        }
        console.log(url.href);
        window.location.href = url.href // chuyển hướng trang web thành đường dẫn khác
    })
})

}

// end status


// form search
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault(); // để ngăn sự mặc định
        console.log(e.target.elements.keyword.value)

        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }else{
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href
    })
}
// end form search


// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    let url = new URL(window.location.href)
    buttonPagination.forEach(button =>{
        button.addEventListener("click",()=>{
        const page = button.getAttribute("button-pagination")
        url.searchParams.set("page",page);
        window.location.href = url.href;
     
        });
     })

}

// end pagination


// checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]")
    const inputsId = checkboxMulti.querySelectorAll("input[name=id]");
    inputCheckAll.addEventListener("click",()=>{
        // console.log(inputCheckAll.checked);

        // checked để biết đã kích trả true
        if(inputCheckAll.checked == true){
            inputsId.forEach(input =>{
                input.checked = true;
            })
        }else{
            inputsId.forEach(input =>{
                input.checked = false;
            })
        }
    })
    inputsId.forEach(input =>{
        
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;
        
            // đoạn querySelectorAll("input[name=id]:checked") 
            // hiểu là selector css lấy ra nhưng thằng input có name là id và đã được tích = true
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            } else inputCheckAll.checked = false;
            
        })
        
    })
    

}   
// end checkbox Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();// để ngăn hành động mặc định
        const checkboxMulti = document.querySelectorAll("[checkbox-multi]");
        const inputsChecked = document.querySelectorAll("input[name='id']:checked")
        // console.log(inputsChecked)

        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all"){
            const isconfirm = confirm("bạn có chắc muốn xóa hết không?")
            if(!isconfirm){
                return; // nếu chạy vào dòng tất cả dòng code ở dưới ngừng chạy
            }
        }

        if(inputsChecked.length > 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input =>{
                const id = input.value;
                ids.push(id);
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }else alert("vui lòng chọn ít nhất bản ghi")

    })
}
// End Form Change Multi