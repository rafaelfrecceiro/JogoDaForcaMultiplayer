var socket = io();

// document.querySelector(".options").classList.add("hide")
// document.querySelector(".game").classList.add("show")

document.querySelector("#txtNewMessageChat").addEventListener("keydown", (event) => {
    if(event.keyCode == 13){
        sendMessageChat()
    }
})

let roomId = ""
let userId = ""

function createRoom(){
    let namePlayer = document.getElementById("txtNamePlayer").value
    if(namePlayer == "") {
        alert("Preencha o nome!")
        return false
    }

    let codeRoomCreate = document.getElementById("txtRoomIdCreated").value

    if(codeRoomCreate == ""){
        alert("Código da sala é obrigatório!")
        return false
    }

    let hashRoomCreated = document.getElementById("txtRoomIdCreated").value
    socket.emit('create-room', hashRoomCreated, namePlayer);
    roomId = hashRoomCreated
    userId = namePlayer

    document.querySelector("#codeRoom").innerHTML = "Sala: "+ roomId
    document.querySelector(".options").classList.add("hide")
    document.querySelector(".game").classList.add("show")
}

function enterRoom(){
    let namePlayer = document.getElementById("txtNamePlayer").value
    if(namePlayer == "") {
        alert("Preencha o nome!")
        return false
    }

    let codeRoomJoin = document.getElementById("txtRoomIdEnter").value

    if(codeRoomJoin == ""){
        alert("Código da sala é obrigatório!")
        return false
    }

    let hashRoomEntered = document.getElementById("txtRoomIdEnter").value
    socket.emit('join-room', hashRoomEntered, namePlayer);
    roomId = hashRoomEntered
    userId = namePlayer
    document.querySelector(".options").classList.add("hide")
    document.querySelector(".game").classList.add("show")
}

socket.on('receive-chat', function(msg, user){
    createChatMessage(msg, user)
})

function createChatMessage(msg, user){
    let tmpli = ""
    if(msg == " entrou na sala"){
        tmpli = "<li><b>"+ user +"</b> "+ msg +"</li>"
    }else{
        tmpli = "<li><b>"+ user +"</b>: "+ msg +"</li>"
    }

    document.getElementById("messages").innerHTML += tmpli
}

function sendMessageChat(){
    let msg = document.querySelector("#txtNewMessageChat").value
    if(msg.length < 0) return false
    createChatMessage(msg, userId)
    socket.emit('send-message-chat', roomId, userId, msg);
    document.querySelector("#txtNewMessageChat").value = ""
}