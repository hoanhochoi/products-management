import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// CLIENT_SEND_MESAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content); // để gửi đi có biến là content
            e.target.elements.content.value = "";
            socket.emit("CLIENT_SEND_TYPING", "hidden"); // để sau khi gửi đi thì xóa typing luôn
        }
    })
}

// END CLIENT_SEND_MESAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    console.log(data);
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const divNew = document.createElement("div");
    const boxTyping = document.querySelector(".chat .inner-list-typing")
    let fullNameHTML = ""
    if (myId == data.userId) {
        divNew.classList.add("inner-outgoing");

    } else {
        divNew.classList.add("inner-incoming");
        fullNameHTML = `<div class="inner-name">${data.fullName}</div>`
    }
    divNew.innerHTML = `
        ${fullNameHTML}
        <div class="inner-content">${data.content}</div>
    `;
    body.insertBefore(divNew, boxTyping); // để typing luôn luôn ở ví trí cuối
    body.scrollTop = body.scrollHeight;

})
// END SERVER_RETURN_MESSAGE

// Scroll chat to bottom
const bodyScroll = document.querySelector(".chat .inner-body");
if (bodyScroll) {
    bodyScroll.scrollTop = bodyScroll.scrollHeight;
    // khiến thanh scroll luôn ở dưới
}
// end Scroll chat to bottom

// show icon chat
const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)
    document.querySelector('.button-icon').onclick = () => {
        tooltip.classList.toggle('shown')
    }
}


// show typing
var timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeOut); // đến khi dừng gõ hản mới chạy vào timeOut
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}
// end show typing

// end show icon chat

// insert icon
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    let input = document.querySelector(".chat .inner-form input[name='content']");

    emojiPicker.addEventListener("emoji-click", (e) => {

        console.log(e.detail.unicode);
        const icon = e.detail.unicode;
        input.value += icon;
        const end = input.value.length;
        input.setSelectionRange(end,end);
        input.focus();
        showTyping();
    });

    // input keyup
    input.addEventListener("keyup", (e) => {
        console.log(e)
        showTyping();
    })

    // end input keyup
}
// end insert icon

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing")
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`.box-typing[user-id='${data.userId}']`)
            if (!existTyping) {
                const bodyChat = document.querySelector(".chat .inner-body");
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);
                boxTyping.innerHTML = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-dots">
                <span></span>
                <span></span> 
                <span></span> 
            </div> 
            `;
                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        } else if (data.type == "hidden") {
            const typingRemove = elementListTyping.querySelector(`.box-typing[user-id='${data.userId}']`)
            if (typingRemove)
                elementListTyping.removeChild(typingRemove);
        }
    })
}

// End SERVER_RETURN_TYPING