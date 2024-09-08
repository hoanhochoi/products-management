console.log("nhúng user")
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