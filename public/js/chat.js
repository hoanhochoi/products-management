// CLIENT_SEND_MESAGE
const formSendData = document.querySelector(".chat .inner-form")
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content); // để gửi đi có biến là content
            e.target.elements.content.value = "";
        }
    })
}

// END CLIENT_SEND_MESAGE

