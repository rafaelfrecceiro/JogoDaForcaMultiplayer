var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('create-room', (roomId, userId) => {
        socket.join(roomId)
    })

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('receive-chat', " entrou na sala", userId)
    })

    socket.on('send-message-chat', (roomId, userId, msg) => {
        socket.to(roomId).emit('receive-chat', msg, userId)
    })
});

http.listen(3000, function(){
    console.log('Servidor rodando em: http://localhost:3000');
});