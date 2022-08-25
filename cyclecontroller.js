var cycleApp = angular.module('cycleApp', []);

cycleApp.controller('CycleController', function ($scope, $interval) {

    $scope.seconds_left = 30;
    $scope.session_length = 30;
    $scope.history = [];
    $scope.pause = true;
    $scope.times = 0;
    $scope.percentStyle = {"width": "100%"};
    $scope.prettyTimes = "01";
    $scope.prettySecondsLeft = "030";
    $scope.imageSrc = "";

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
        var which = $scope.rand(1,7),
            file = "",
            max = 1;
        if (which == 1) {
            file = ".\\Poses\\Chanon_Large\\Chanon" ;
            max = 313;
        }
        if (which == 2) {
            file = ".\\Poses\\Aaron_Large\\Aaron" ;
            max = 325;
        }
        if (which == 3) {
            file = ".\\Poses\\Marcia_Large\\Marcia" ;
            max = 226;
        }
        if (which == 4) {
            file = ".\\Poses\\Veronica_Large\\Veronica" ;
            max = 433;
        }
        if (which == 5) {
            file = ".\\Poses\\Yoni_Large\\Yoni" ;
            max = 306;
        }
        if (which == 6) {
            file = ".\\Poses\\Mallory_Large\\Mallory-" ;
            max = 158;
        }
        return file + $scope.pad($scope.rand(1, max),3) + ".jpg";
    }; 

    $scope.defaultProgram = [{times: 10, seconds:30},
                             {times: 14, seconds:60},
                             {times: 16, seconds:300},
                             {times: 20, seconds:600}];

    $scope.updateImage = function() {
        $scope.imageSrc = $scope.history[$scope.times];
        var t = _.filter($scope.defaultProgram, function(x){ return $scope.times <= x.times; });
        var s = _.first(t);
        $scope.seconds_left = s.seconds;
        $scope.session_length = s.seconds;
    };

    $scope.previousImage = function() {
        $scope.times--;
        $scope.updateImage();
    };

    $scope.nextImage = function() {
        $scope.times++;
        $scope.updateImage();
    };
    
    $scope.cycleFn = function() {
        if (! $scope.pause) {
            $scope.seconds_left--;
        }
        $scope.prettySecondsLeft = $scope.pad($scope.seconds_left, 3);
        $scope.prettyTimes = $scope.pad($scope.times,2);
        $scope.percentStyle.width = $scope.percentOver() + "%";

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

    $scope.back = function() {
        if ($scope.times !== 1){ 
            $scope.pause = false;
            $scope.previousImage();
        }
    };

    $scope.init = function() {
        $scope.history = _.map(_.range(100), function(x) { return $scope.randomImage();});
        $scope.nextImage();
    };


    $scope.init();
    $interval($scope.cycleFn, 1000);
});
