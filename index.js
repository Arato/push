"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    socket.on('php.alert.created', function (response) {
        io.emit('alert.created', response);
    });
    socket.on('php.alert.updated', function (response) {
        io.emit('alert.updated', response);
    });
    socket.on('php.alert.deleted', function (response) {
        io.emit('alert.deleted', response);
    });

    socket.on('disconnect', function () {
        console.info('SocketIO : Received ' + nb + ' messages');
        console.info('SocketIO > Disconnected socket ' + socket.id);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});