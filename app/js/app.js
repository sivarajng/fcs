var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/partials/dash"
        , controller: 'ctrl' 
    })
    .when("/settings", {
        templateUrl : "/partials/settings"
        , controller: 'ctrl' 
    })
    .when("/calender", {
        templateUrl : "/partials/calender"
        , controller: 'ctrl' 
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});

app.controller('ctrl',function($scope,$document){
var user = angular.element($document[0].querySelector('#user'));
var userAdd = angular.element($document[0].querySelector('#userAdd'));
var attendance = angular.element($document[0].querySelector('#attendance'));

user.css({'display':'block'});
userAdd.css({'display':'none'});
attendance.css({'display':'none'});

$scope.showUser = function(){
    user.css({'display':'block'});
    userAdd.css({'display':'none'});
    attendance.css({'display':'none'});
    console.log('clicked showUser');
}

$scope.showAttendance = function(){
    user.css({'display':'none'});
    userAdd.css({'display':'none'});
    attendance.css({'display':'block'});
    console.log('clicked showAttendance');
}

$scope.userAdd = function(){
    user.css({'display':'none'});
    userAdd.css({'display':'block'});
    attendance.css({'display':'none'});
    console.log('clicked showAttendance');
}

});