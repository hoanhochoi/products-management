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