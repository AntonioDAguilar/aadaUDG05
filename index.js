var PORT = 8081;
var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var http = require('http');
var server = http.Server(app);

// Static files
app.use(express.static('public'));

server.listen(PORT, function(){
    console.log('listening to requests on port 8081');
});

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);
    });
});