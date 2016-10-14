angular.module('chat-app')
.controller('MsgsCtrl' , function ($scope , MsgSvc, $window){

    if($scope.currentUser) {
        $scope.getUserMessages = function (user) {
            if($scope.currentUser) {
                MsgSvc.getUserMessages(user, $scope.currentUser).then(function (messages) {
                    $scope.msgs = messages.data
                    $scope.reciever = user

                   // console.log('msg crtl me user messages le kr wapis a gya', messages.data)
                })
            }
            else{
                $window.alert("pehle login phir message")
            }

        }
    }





    $scope.addMsg = function(){
        if($scope.msgBody) {
            MsgSvc.addMsg({senderId:$scope.currentUser._id,
            senderName: $scope.currentUser.username,
            recieverId:$scope.reciever._id,
            recieverName:$scope.reciever.username,
            messageBody:$scope.msgBody})
                .success(function(message){
                    //console.log('msg ctrl ' , message)
                    $scope.msgs.unshift(message)
                    $scope.msgBody = null
                    console.log('msg ctrl ' , message , $scope.msgs)
                })
        }
    }
    MsgSvc.getLoginUsers().success(function(users){

        if($scope.currentUser!= null){
            var index =users.indexOf($scope.currentUser)
            console.log(index , "index 0f user")
            if(index!= -1){
                users.splice(index , 1)
                console.log("hahah splice ho gya")
            }
            $scope.loginUsers = users
        }
        //else
            // $scope.loginUsers = users
    })
    $scope.$on('ws:new_user' ,function(_, user){
        $scope.$apply(function(){
            //console.log('hahahahaha msg ctrl')

            if($scope.currentUser){
                var index =user.indexOf($scope.currentUser)
                if(index!= -1){
                    user.splice(index , 1)
                }
                $scope.loginUsers = user
            }
           // console.log($scope.loginUsers , 'msgctrl user')
           // console.log($scope.loginUsers.length)
        })
    })
    $scope.$on('ws:new_msg' ,function(_, message){
        $scope.$apply(function(){

            if(message.recieverId == $scope.currentUser._id)
            $scope.msgs.unshift(message)
            console.log('in new_msg',message.recieverId , $scope.currentUser._id)

        })
    })
    //console.log($scope.loginUsers)

})