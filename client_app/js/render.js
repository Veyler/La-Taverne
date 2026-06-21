if (!localStorage.getItem("authToken")) {
    window.location.href = "../pages/login.html"
}

const token = localStorage.getItem("authToken")
const socket = io("https://la-taverne-cjm6.onrender.com", {
    auth : { token : token}
})

socket.on("message", text => {
    const DivMessage = document.createElement("div")
    DivMessage.classList.add("Message")
    DivMessage.textContent = text
    
    const parent = document.getElementById("ChatBox")
    parent.appendChild(DivMessage)
})

function send_clicked(x){
    var text = document.getElementById("InputMessage").value
    console.log("Send Button clicked")
    console.log("Message : " + text)
    socket.emit("message", text)
}

function disconnect_clicked(x){
    localStorage.removeItem("authToken")
    window.location.href = "../pages/login.html"  
}
