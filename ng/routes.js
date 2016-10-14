angular.module('chat-app')
.config(function($routeProvider){
    $routeProvider
        .when('/' , {controller: 'MsgsCtrl' , templateUrl:'chat.html'})
        .when('/register' , {controller: 'LoginCtrl' , templateUrl:'register.html'})
        .when('/login' , {controller: 'LoginCtrl' , templateUrl:'login.html'})
})