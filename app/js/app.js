var app = angular.module("app", ["ngRoute",'ngMaterial', 'ngMessages']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/dash"
       
    })
    .when("/settings", {
        templateUrl : "/views/settings"
       
    })
    .when("/calender", {
        templateUrl : "/views/calender"
       
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