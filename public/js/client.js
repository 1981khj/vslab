$(document).ready(function () {
    var socket = io.connect('http://vslab.herokuapp.com/');
    //var socket = io.connect('http://vslab.hjkim.c9.io/');
    socket.on('join', function(data) {
        alert("welcome");
    });
    
    socket.on('imgdata', function(data) {
        console.log(data);
    });
    
    socket.on('drawImg', function(data) {
        console.log("drawImg");
        console.log(data);
        $("#outPutImg").attr("src",data);
    });
    
    socket.emit('join');
});