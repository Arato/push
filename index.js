"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    var nb = 0;

    console.info('SocketIO > Connected socket ' + socket.id);

    socket.on('broadcast', function (message) {
        ++nb;
        console.log("broadcast !");
        console.info('ElephantIO broadcast > ' + JSON.stringify(message));

        io.emit('alert.created', JSON.stringify(message));
    });

    socket.on('disconnect', function () {
        console.info('SocketIO : Received ' + nb + ' messages');
        console.info('SocketIO > Disconnected socket ' + socket.id);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});