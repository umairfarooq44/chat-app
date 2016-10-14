angular.module('chat-app')
.service('LoginSvc' , function($http){
    var svc = this;
    svc.getUser = function(){
        return $http.get('/api/users')

    }
    svc.login = function(username , password){
        return $http.post('/api/sessions' , {
            username:username , password: password}
        ).then(function(val){
                $http.defaults.headers.common['X-Auth'] = val.data
                return svc.getUser()

            })

    }
    svc.signUp = function(user){
        return $http.post('/api/users' , user)
    }
})