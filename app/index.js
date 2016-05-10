'use strict';

const angular = require('angular');
require('angular-route');

const app = angular.module('myApp', ['ngRoute']);

require(__dirname + '/services/auth-service.js')(app);
require(__dirname + '/directives/app-directive.js')(app);
require(__dirname + '/services/error-service.js')(app);

app.controller('ProjectController', ['$http','$window','AuthService', 'ErrorService', '$location', function($http,$window, AuthService,  ErrorService, $location){
  const projectRoute = 'http://localhost:3000/projects';
  const mainRoute = 'http://localhost:3000';
  this.projects = ['project'];
  this.error = ErrorService();
  this.editing = false


  this.getProjects = function(){
    var tokenFromLocalStorage = $window.localStorage.token;
    console.log('localStorage?? ' + $window.localStorage.token);
    $http.get(projectRoute, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function(result){
      // this.error = ErrorService(null);
      console.log(result);
      // if (result.data.data.length){
        this.projects = result;

      // }
    }, (err)=>{
      this.error = ErrorService('Please Sign in');
      $location.path('/signup');
    });
  };
  this.createProject = function(project){
    $http.post(projectRoute, project, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(function(res){
      console.log(res.data);
      this.projects.push(res.data);
      this.getProjects();
    }, (err)=>{
      console.log(err);
    });
  };
  this.removeProject = function(project){
    $http.delete(projectRoute + '/' + project._id, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(function(res){
      this.projects = this.projects.filter((p)=> p._id != project._id);
    });
  };
  this.updateProject = function(project){
    $http.put(projectRoute + '/' + project._id, project, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      project.editing = false;
    }, (err)=> console.log(err));
  };
  this.toggleForm = function(project){
    var backupName;
    if(!project.editing){
      project.backupName = project.name;
      project.editing = true;
    } else {
      project.name = project.backupName;
      project.editing = false;
    }
  }
  }]);

  app.controller('AuthController', ['$http','$window','AuthService','ErrorService', '$location', function($http,$window, AuthService, ErrorService, $location){

  this.signUp = function(user){
    AuthService.createUser(user, function(err){
      if(err) return this.error = ErrorService('cannot create user');
      // this.error = ErrorService(null);
      $location.path('/home');
    });
  };

  this.signOut = function(){
    AuthService.signOut(()=>{
      $location.path('/signup');
    });
  };
  this.signIn = function(user){
    AuthService.signIn(user, (err)=>{
      if(err) return this.error = ErrorService('Error signin in. Try again');
      // this.error = ErrorService(null);
      $location.path('/home');
    });
  };
}]);


//routes

app.config(['$routeProvider', function(router){
  router
  // homepage
  .when('/home', {
    templateUrl: 'pages/home.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })

  .when('/signup', {
  controller: 'AuthController',
  controllerAs: 'authctrl',
  templateUrl: 'pages/signup-in.html'
})
.when('/projects', {
controller: 'ProjectController',
controllerAs: 'projectctrl',
templateUrl: 'pages/projects.html'
})
.when('/resume', {
controller: 'ResumeController',
controllerAs: 'resumectrl',
templateUrl: 'pages/resume.html'
})
.when('/contact', {
controller: 'ContactController',
controllerAs: 'contactctrl',
templateUrl: 'pages/contact.html'
})

}]);
