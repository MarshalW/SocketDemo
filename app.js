/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , io = require('socket.io');

var app = module.exports = express.createServer(),
    io = io.listen(app);

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//io.of('/echo').on('connection', function (socket) {
//    console.log('connected');
//    socket.on('echo', function (name,fn) {
//        console.log('收到来自'+name+'的消息。');
//        fn('好的'+name+'，收到回执！');
//    });
//});

io.on('connection', function (socket) {
    console.log('>>>>>>>connected');

    socket.on('message',function(message){
        console.log('receive message: '+message);
    });
});


