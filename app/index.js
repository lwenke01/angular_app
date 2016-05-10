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
  const vm = this;
  vm.projects = [{name: 'Create New Project'}];
  vm.error = ErrorService();
  console.log(vm.error);



  vm.getProjects = function(){
    var tokenFromLocalStorage = $window.localStorage.token;
    console.log('localStorage?? ' + $window.localStorage.token);
    $http.get(projectRoute, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function(result){
      vm.error = ErrorService(null);
      console.log(result);
      console.log(result.data);
      vm.projects = result.data;
    }, (err)=>{
      vm.error = ErrorService('Please Sign in');
      $location.path('/signup');
    });
  };
  vm.createProject = function(project){
    $http.post(projectRoute, project,{
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function(res){
      console.log(res);
      vm.projects.push(res.data);
      vm.newProject = null;
    });
  };
  vm.removeProject = function(project){
    $http.delete(projectRoute + '/' + project._id, {
      headers: {
        token: AuthService.getToken()

      }
    })
    .then(function(res){
      vm.projects = vm.projects.filter((p)=> p._id != project._id);
    });
  };
  vm.updateProject = function(project){
    $http.put(projectRoute + '/' + project._id, project, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      },
      data: {
        name: project.name,
        description: project.description,
        created: project.created,
        course: project.course
      }
    })
    .then((res)=>{
      project.editing = false;
    }, (err)=> console.log(err));
  };
  vm.toggleForm = function(project){
    if(!project.editing){
      project.backupName = project.name;
      project.editing = true;
    } else {
      project.name = project.backupName;
      project.editing = false;
    }
  }
}]);
app.controller('ResumeController', ['$http','$window','AuthService', 'ErrorService', '$location', function($http,$window, AuthService,  ErrorService, $location){
  const resumeRoute = 'http://localhost:3000/resumes';
  const mainRoute = 'http://localhost:3000';
  const vm = this;
  vm.resumes = [{name: 'Create New Resume'}];
  vm.error = ErrorService();
  console.log(vm.error);



  vm.getResumes = function(){
    var tokenFromLocalStorage = $window.localStorage.token;
    console.log('localStorage?? ' + $window.localStorage.token);
    $http.get(resumeRoute, {
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function(result){
      vm.error = ErrorService(null);
      console.log(result);
      console.log(result.data);
      vm.resumes = result.data;
    }, (err)=>{
      vm.error = ErrorService('Please Sign in');
      $location.path('/signup');
    });
  };
  vm.createResume = function(resume){
    $http.post(resumeRoute, resume,{
      headers: {
        token: AuthService.getToken()
      }
    })
    .then(function(res){
      console.log(res);
      vm.resumes.push(res.data);
      vm.newResume = null;
    });
  };
  vm.removeResume = function(resume){
    $http.delete(resumeRoute + '/' + resume._id, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      }
    })
    .then(function(res){
      vm.resumes = vm.resumes.filter((p)=> p._id != resume._id);
    });
  };
  vm.updateResume = function(resume){
    $http.put(resumeRoute + '/' + resume._id, resume, {
      headers: {
        token: AuthService.getToken(),
        'Content-Type': 'application/json'
      },
      data: {
        company: resume.company,
        title: resume.title,
        description: resume.description,
        dates: resume.dates

      }
    })
    .then((res)=>{
      resume.editing = false;
    }, (err)=> console.log(err));
  };
  vm.toggleForm = function(resume){
    if(!resume.editing){
      resume.backupName = resume.name;
      resume.editing = true;
    } else {
      resume.name = resume.backupName;
      resume.editing = false;
    }
  }
}]);



app.controller('AuthController', ['$http','$window','AuthService','ErrorService', '$location', function($http,$window, AuthService, ErrorService, $location){
  const vm = this;

  vm.signUp = function(user){
    AuthService.createUser(user, function(err){
      if(err) return vm.error = ErrorService('cannot create user');
      // vm.error = ErrorService(null);
      $location.path('/home');
    });
  };

  vm.signOut = function(){
    AuthService.signOut(()=>{
      $location.path('/signup');
    });
  };
  vm.signIn = function(user){
    AuthService.signIn(user, (err)=>{
      if(err) return vm.error = ErrorService('Error signin in. Try again');
      // vm.error = ErrorService(null);
      $location.path('/home');
    });
  };
}]);
app.controller('ContactController', function($scope){

  $scope.phone = '206-383-1273';
  $scope.email = 'lwenke@gmail.com';
});


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
  .when('/resumes', {
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
