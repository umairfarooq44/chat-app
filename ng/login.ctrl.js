angular.module('chat-app')
.controller('LoginCtrl' , function($scope , LoginSvc){
    $scope.login = function(username , password)
    {
        LoginSvc.login(username , password)
            .then(function(user){
                $scope.$emit('login', user.data)
                console.log(user)
                console.log(user.data,'aur aise user login ho gya')
            })
    }
    $scope.signUp = function(username , password)
    {
        LoginSvc.signUp({username:username , password:password})
            .then(function(user){
                console.log(user,'post wala')
                console.log(user.data)
            })
    }
})