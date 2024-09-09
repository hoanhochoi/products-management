// chức năng gửi yêu cầu kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const userId = btn.getAttribute("btn-add-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("add"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_ADD_FRIEND",userId);
        })
        
    })
}
// end chức năng gửi yêu càu

// chức năng xóa yêu cầu kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
console.log("list cancel")
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const userId = btn.getAttribute("btn-cancel-friend");
            console.log(userId)
            btn.closest(".box-user").classList.remove("add"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_CANCEL_FRIEND",userId);
        })
        
    })
}
// end chức năng x yêu càu
