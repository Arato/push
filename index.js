"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    socket.on('php.alert.created', function (data) {
        io.emit('alert.created', data);
    });
    socket.on('php.alert.updated', function (data) {
        io.emit('alert.updated', data);
    });
    socket.on('php.alert.deleted', function (data) {
        io.emit('alert.deleted', data);
    });

    socket.on('disconnect', function () {
        console.info('SocketIO : Received ' + nb + ' messages');
        console.info('SocketIO > Disconnected socket ' + socket.id);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});