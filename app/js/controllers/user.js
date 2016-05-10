'use strict';
module.exports = function(app){
  app.controller('UserController', ['$http', 'AuthService', '$location', function($http, AuthService, $location){
    var userRoute = 'http://localhost:8080/users';
    this.users = ['user'];

    this.signUp = function(user){
      AuthService.createUser(user, function(err, res){
        if(err) return err;
        $location.path('/home');
      });
    }

    this.signOut = function(){
      AuthService.signOut(()=>{
        $location.path('/signup');
      });
    }
    this.signIn = function(user){
      AuthService.signIn(user, (err, res)=>{
        if(err) return err;
        $location.path('/home');
      });
    };
  }]);
};
