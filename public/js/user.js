// chức năng gửi yêu cầu kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-add-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("add"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })

    })
}
// end chức năng gửi yêu càu

// chức năng xóa yêu cầu kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-cancel-friend");
            console.log(userId)
            btn.closest(".box-user").classList.remove("add"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })

    })
}
// end chức năng x yêu càu

// chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-refuse-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("refuse"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })

    })
}
// end chức năng từ chối kết bạn

// chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("btn-accept-friend");
            console.log(userId)
            btn.closest(".box-user").classList.add("accepted"); // tìm đến bên ngoài của thẻ
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })

    })
}
// end chức năng chấp nhận kết bạn


//  SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept] ");
if (badgeUsersAccept) {
    const badgeUsersAcceptId = badgeUsersAccept.getAttribute("badge-users-accept")
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
        console.log(data)
        if (data.userId === badgeUsersAcceptId)
            badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    })
}
//  END SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    // Trang lời mời đã nhận
    const userAccept = document.querySelector("[data-user-accept]");
    if (userAccept) {
        const userAcceptId = userAccept.getAttribute("data-user-accept")
        if (userAcceptId === data.userId) {
            // vẽ user ra giao diện
            const div = document.createElement("div")
            div.classList.add("col-6")
            div.setAttribute("user-id", data.infoUserA._id)
            const string = `
            
                 <div class="box-user ">
                    <div class="inner-avatar">
                        <img src="/images/avatar.jpg" alt="${data.infoUserA.fullName}">
                        </div><div class="inner-info">
                        <div class="inner-name">${data.infoUserA.fullName}</div>
                        <div class="inner-buttons">
                            <button 
                                class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
                            <button 
                                class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserA._id}">Xóa</button>
                            <button 
                                class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="btn-deleted-friend" disabled="disabled">Đã xóa</button>
                            <button 
                                class="btn btn-sm btn-primary mr-1" btn-accepted-friend="btn-accepted-friend" disabled="disabled">Đã chấp nhận</button>
                        </div>
                    </div>
                 </div>
        `
            div.innerHTML = string;
            userAccept.appendChild(div);
            // end vẽ user ra giao diện

            // chấp nhận lời mời kết bạn
            const buttonAccept = div.querySelector("[btn-accept-friend]")
            buttonAccept.addEventListener("click", () => {
                const userId = buttonAccept.getAttribute("btn-accept-friend");
                console.log(userId)
                buttonAccept.closest(".box-user").classList.add("accepted"); // tìm đến bên ngoài của thẻ
                socket.emit("CLIENT_ACCEPT_FRIEND", userId);
            })
            // end chấp nhận lời mời kết bạn

            // từ chối lời mời
            const buttonRefuse = div.querySelector("[btn-refuse-friend]")
            buttonRefuse.addEventListener("click", () => {
                const userId = buttonRefuse.getAttribute("btn-refuse-friend");
                buttonRefuse.closest(".box-user").classList.add("refuse"); // tìm đến bên ngoài của thẻ
                socket.emit("CLIENT_REFUSE_FRIEND", userId);
            })
            // end từ chối lời mời

        }
    }

    // Trang danh sách người dùng
    const dataUserNotFriend = document.querySelector("[data-user-notFriend]");
    if (dataUserNotFriend) {
        const userRemove = dataUserNotFriend.querySelector(`[user-id='${data.infoUserA._id}']`);
        console.log(userRemove);
        const myUserId = dataUserNotFriend.getAttribute("data-user-notFriend")
        if (myUserId === data.userId) {
            dataUserNotFriend.removeChild(userRemove);
        }
    }
});

//END  SERVER_RETURN_INFO_ACCEPT_FRIEND



// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const userIdA = data.userIdA;
    const userIdB = data.userIdB;
    const boxUserRemove = document.querySelector(`[user-id='${userIdA}']`)
    if (boxUserRemove) {
        console.log(boxUserRemove)
        const dataUserAccept = document.querySelector("[data-user-accept]")
        const userIdB = badgeUsersAccept.getAttribute("badge-users-accept")
        if (userIdB === data.userIdB) { // vì socket.broadcast sẽ gửi đi tất cả nên phải check không xóa tất cả các user
            dataUserAccept.removeChild(boxUserRemove);
        }
    }
})
//end  SERVER_RETURN_USER_ID_CANCEL_FRIEND

// SERVER_RETURN_USER)STATUS_ONLINE
socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
    const dataUserFriend = document.querySelector(`[data-user-friend]`);
    if (dataUserFriend) {
        const userStatus = dataUserFriend.querySelector(`[user-id='${data.userId}']`)
        if (userStatus) {
            const boxStatus = dataUserFriend.querySelector(("[status]"))
            boxStatus.setAttribute("status", data.status)
        }

    }
})
// end SERVER_RETURN_USER_STATUS_ONLINE