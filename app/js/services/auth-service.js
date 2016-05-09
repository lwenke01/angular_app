
'use strict';

module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window){
    var token;
    var url = 'http://localhost:8080/'
    var auth = {
      getToken(){
        return token || $window.localStorage.token;
      },
      signOut(cb){
        token = null;
        $window.localStorage.token = null;
        if(cb) cb();
      },
      signIn(user, cb){
        cb || function(){};
        $http.post(url + '/auth-token/', {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
          }
        }).then((res)=>{
          token = $window.localStorage.token = res.data.token;
          cb(null, res);
        }, (err) =>{
          cb(err);
        });
      }
    };
    return auth;
  }]);

};
