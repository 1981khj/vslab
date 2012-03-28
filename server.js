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

/*io.configure('production', function(){    
    //io.set('log level', 2);    
    io.set('transports', ['websocket']);
});

io.configure('development', function(){
    io.set('transports', ['websocket']);
});*/

io.configure(function () { 
    io.enable('browser client minification');  // send minified client
    io.enable('browser client etag');          // apply etag caching logic based on version number
    io.enable('browser client gzip');          // gzip the file
    io.enable('browser client etag');
    io.set('log level', 1);
    
    io.set('transports', [
        'xhr-polling'
        , 'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'jsonp-polling'
    ]);
    /*io.set("transports", ["xhr-polling"]); */
    /*io.set("polling duration", 10); */
});

io.sockets.on('connection', function(socket) {
    socket.on('join', function(){
        socket.emit('join');
    });
    
    socket.on('receiveImg', function(data){        
        io.sockets.volatile.emit('imgdata', data);
        io.sockets.volatile.emit('drawImg', data);
    });
    
    socket.on('disconnect', function(){                
    });
});

if (!module.parent) {
  app.listen(port);
  console.log('Server is Running! listening on port '+port);
}