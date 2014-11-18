var cycleApp = angular.module('cycleApp', []);

cycleApp.controller('CycleController', function ($scope) {

    $scope.seconds_left = 30;
    $scope.session_length = 30;
    $scope.history = [];
    $scope.pause = true;
    $scope.times = 1;
    
    $scope.rand = function(s, e) { 
        return Math.floor((Math.random() * (e-s)) + s);
    };
    $scope.pad = function (str, max) {
        str = str.toString();
        return str.length < max ? $scope.pad("0" + str, max) : str;
    };
    $scope.percentOver = function () {
        return ($scope.seconds_left/$scope.session_length)*100;
    };
    $scope.randomImage = function() {
        var which = $scope.rand(1,6),
            file = "",
            max = 1;
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
        var src = file + $scope.pad($scope.rand(1, max),3) + ".jpg";
        document.getElementById('image').src = src;
        $scope.history.push(src);
    }; 
    $scope.defaultProgram = [{times: 10, seconds:30},
                             {times: 14,  seconds:60},
                             {times: 16,  seconds:300},
                             {times: 20, seconds:600}];
    $scope.nextImage = function() {
        $scope.randomImage();
       
        var t = _.filter($scope.defaultProgram, function(x){ return $scope.times <= x.times; });
        var s = _.first(t);
        $scope.seconds_left = s.seconds;
        $scope.session_length = s.seconds;

        $scope.times++;
    };
    $scope.cycleFn = function() {
        if (! $scope.pause) {
            $scope.seconds_left--;
        }
        document.getElementById('timer_div').innerHTML = $scope.pad($scope.seconds_left, 3) + " - " + $scope.pad($scope.times,2);
        document.getElementById('progressBar').style.width = $scope.percentOver() + "%";
        if ($scope.seconds_left <= 0) {
            $scope.nextImage();
        }
    };
    
    $scope.togglePause = function() {
        $scope.pause = !$scope.pause;
    };

    $scope.skip = function() {
        $scope.pause = false;
        $scope.nextImage();
    };

    $scope.randomImage();
    var interval = setInterval($scope.cycleFn, 1000);
});
