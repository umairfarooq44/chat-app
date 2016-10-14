angular.module('chat-app')
    .controller('ApplicationCtrl', function ($scope) {
        $scope.$on('login', function (_, user) {

            //console.log("In ap ctrl")
            $scope.currentUser = user

        })
    })