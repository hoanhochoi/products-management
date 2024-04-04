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