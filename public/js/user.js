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

// chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const userId = btn.getAttribute("btn-refuse-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("refuse"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_REFUSE_FRIEND",userId);
        })
        
    })
}
// end chức năng từ chối kết bạn

// chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const userId = btn.getAttribute("btn-accept-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("accepted"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_ACCEPT_FRIEND",userId);
        })
        
    })
}
// end chức năng chấp nhận kết bạn


//  SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept] ");
if(badgeUsersAccept ){
    const badgeUsersAcceptId = badgeUsersAccept.getAttribute("badge-users-accept")
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",(data)=>{
        console.log(data)
        if(data.userId === badgeUsersAcceptId)
            badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    })
}
//  END SERVER_RETURN_LENGTH_ACCEPT_FRIEND

