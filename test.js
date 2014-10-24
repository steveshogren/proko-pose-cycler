var seconds_left = 30;
var rand = function(s, e) {
    return Math.floor((Math.random() * (e-s)) + s);
};
var times = 1;
var pad = function (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};
var pickRandomImage = function() {
    var which = rand(0,5);
    var t = [{ file : ".\\Poses\\Chanon_Large\\Chanon",
               max : 313},
             { file : ".\\Poses\\Aaron_Large\\Aaron" ,
               max : 325},
             {file : ".\\Poses\\Marcia_Large\\Marcia",
              max : 226},
             {file : ".\\Poses\\Veronica_Large\\Veronica",
              max : 433},
             {file : ".\\Poses\\Yoni_Large\\Yoni",
              max : 306}];
    return t[which];
};
var randomImage = function() {
    var image = pickRandomImage();
    var file = image.file;
    var max = image.max;
    document.getElementById('image').src = file + pad(rand(1, max),3) + ".jpg";
};
randomImage();
var interval = setInterval(function() {
    seconds_left--;
    document.getElementById('timer_div').innerHTML = pad(seconds_left, 3) + " - " + pad(times,2);
    if (seconds_left <= 0) {
        randomImage();

        if (times <= 10) {seconds_left = 30; }
        else if (times <= 14) {seconds_left = 60; }
        else if (times <= 16) {seconds_left = 300; }
        else {seconds_left = 600; }
        times++;

    }}
                           , 1000);

var skip = function() {
    seconds_left = 1;
};
