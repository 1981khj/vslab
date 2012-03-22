$(document).ready(function () {
    var socket = io.connect('http://vslab.hjkim.c9.io/');
    var video  = $("#video")[0];
    var canvas = $("#canvas")[0];
	var ctx = canvas.getContext('2d');
	var intervalTimer=null;
    
    
    if(navigator.getUserMedia) {
        navigator.getUserMedia('video', successCallback, errorCallback);
        function successCallback( stream ) {
            video.src = stream;
        }
        function errorCallback( error ) {
            //heading.textContent = "An error occurred: [CODE " + error.code + "]";
        }
    }
    
	$("#start").click(function(){
		startTimer();
	});
	
	$("#stop").click(function(){
		stopTimer();
	});
	
	function capture(){
		var scaleFactor = 0.25;
		var w = $("#video")[0].videoWidth * scaleFactor;
		var h =  $("#video")[0].videoHeight * scaleFactor;
		canvas.width  = w;
		canvas.height = h;
		ctx.drawImage(video, 0, 0, w, h);
		var stringData=canvas.toDataURL();
        socket.emit('receiveImg',stringData);
	}
	
	function startTimer(){
		intervalTimer = setInterval(function(){					
			capture();
		},100);
	}
	
	function stopTimer(){
		clearInterval(intervalTimer);				
	}
	
});