
const socket=io()

let chatDescriptor=document.querySelector(".Chat-descriptor");

socket.on("connect",()=>{

chatDescriptor.innerText="Connected , Chat now 😁"


})

//Input form element
let messageInput=document.querySelector(".input")

//Container of currently posted messages
let container=document.querySelector(".current-messages")

//Sends messages
function sendMessage(){
    message=messageInput.value
    messageInput.value=""
    socket.emit("message",message)
}


//Send button
let sendButton=document.querySelector(".send-button")

//onClick event listener for button
sendButton.addEventListener("click",sendMessage)

//"Enter key" press event listener for input field
messageInput.addEventListener("keypress",(e)=>{
    if(e.which===13){
        socket.emit("message",messageInput.value)
        messageInput.value=""
    }


})

socket.on("message",(message_data)=>{
let messageElement=document.createElement("textarea")

    messageElement.maxLength="5000"
    messageElement.cols="50"
    messageElement.rows="1"
    messageElement.style.borderRadius="15px"
    messageElement.value=message_data
    messageElement.style.border="2px solid black"
    messageElement.style.backgroundColor="#2655a9"
    messageElement.style.marginLeft="30px"
    messageElement.style.marginTop="10px"
    messageElement.style.color="white"
    messageElement.style.fontFamily="Helvetica,Arial"
    messageElement.style.fontSize="20px"
    messageElement.style.height="36px"


    container.appendChild(messageElement)

})

