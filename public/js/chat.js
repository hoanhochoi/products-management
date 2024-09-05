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
    body.appendChild(divNew);
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

// end show icon chat


// insert icon
const emojiPicker = document.querySelector("emoji-picker");
if(emojiPicker){
    let input = document.querySelector(".chat .inner-form input[name='content']");

    emojiPicker.addEventListener("emoji-click",(e)=>{
        
        console.log(e.detail.unicode);
        const icon = e.detail.unicode;
        input.value += icon;
    })
}
// end insert icon