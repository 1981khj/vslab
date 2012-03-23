var port = process.env.PORT;
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.configure(function() {
  app.set('views', __dirname + '/views');  
  app.set('view engine', 'jade');  
  app.register('.html', require('jade'));
  app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', function(req, res) {
    res.render('client');
});

app.get('/teacher', function(req, res) {
    res.render('index');
});

app.get('/mobile', function(req, res) {
    res.render('mobile');
});

app.get('/am', function(req, res) {
    res.render('am');
});

io.configure('production', function(){
    io.enable('browser client minification');  // send minified client
    io.enable('browser client etag');          // apply etag caching logic based on version number
    io.enable('browser client gzip');          // gzip the file
    io.enable('browser client etag');
    //io.set('log level', 2);
    //io.set('close timeout', 1500);
    io.set('transports', [
        'websocket'
        /*, 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
        */
    ]);
});

io.configure('development', function(){
    io.set('transports', ['websocket']);
});

io.sockets.on('connection', function(socket) {
    socket.on('receiveImg', function(data){
        io.sockets.emit('drawImg', data);
        io.sockets.emit('imgdata', data);
    });
    
    socket.on('join', function(){
        io.sockets.emit('join');
    });
    
    socket.on('disconnect', function(){                
	});
});

if (!module.parent) {
  app.listen(port);
  console.log('Server is Running! listening on port '+port);
}