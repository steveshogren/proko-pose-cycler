var seconds_left = 30;
var session_length = 30;
var pause = true;
var rand = function(s, e) {
    return Math.floor((Math.random() * (e-s)) + s);
};
var times = 1;
var pad = function (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

var percentOver = function () {
    return (seconds_left/session_length)*100;
};
var randomImage = function() {
    var which = rand(1,6);
    var file = "";
    var max = 1;
    if (which == 1) {
        file = "..\\Poses\\Chanon_Large\\Chanon" ;
        max = 313;
    }
    if (which == 2) {
        file = "..\\Poses\\Aaron_Large\\Aaron" ;
        max = 325;
    }
    if (which == 3) {
        file = "..\\Poses\\Marcia_Large\\Marcia" ;
        max = 226;
    }
    if (which == 4) {
        file = "..\\Poses\\Veronica_Large\\Veronica" ;
        max = 433;
    }
    if (which == 5) {
        file = "..\\Poses\\Yoni_Large\\Yoni" ;
        max = 306;
    }
    document.getElementById('image').src = file + pad(rand(1, max),3) + ".jpg" 
};
randomImage();
var nextImage = function() {
    randomImage();
    
    if (times <= 10) {seconds_left = 30; session_length = 30; }
    else if (times <= 14) {seconds_left = 60; session_length = 60; }
    else if (times <= 16) {seconds_left = 300; session_length = 300; }
    else {seconds_left = 600; session_length = 600;}
    times++;
};
var cycleFn = function() {
    if (! pause) {
        seconds_left--;
    }
    document.getElementById('timer_div').innerHTML = pad(seconds_left, 3) + " - " + pad(times,2);
    document.getElementById('progressBar').style.width = percentOver() + "%";
    if (seconds_left <= 0) {
        nextImage();
    }
};
                           
var interval = setInterval(cycleFn, 1000);

var togglePause = function() {
    pause = !pause;
    document.getElementById('togglePaused').innerHTML = (pause) ? "Start" : "Pause"; 
};

var skip = function() {
    pause = false;
    nextImage();
};
