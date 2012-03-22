$(document).ready(function () {
    var socket = io.connect('http://vslab.hjkim.c9.io/');
    
    socket.on('drawImg', function(data) {
        console.log("drawImg");
        console.log(data);
        $("#outPutImg").attr("src",data);
    });
});