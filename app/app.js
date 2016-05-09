'use strict';

const angular = require('angular');
require('angular-route');

const app = angular.module('myApp', ['ngRoute']);

//controllers
require(__dirname + '/controllers/school.js')(app);
require(__dirname + '/controllers/work.js')(app);

//services
require(__dirname + '/services/auth-service.js')(app);


//Directives

//routes

app.config(function($routeProvider) {
  $routeProvider
  // homepage
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'mainController'
  })
  //about me
  .when('/about', {
    templateUrl: 'pages/about.html',
    controller: 'aboutController'
  })
  //projects
  .when('/projects', {
    templateUrl: 'pages/projects.html',
    controller: 'projectsController'
  })
  .when('/contact', {
    templateUrl: 'pages/contact.html',
    controller: 'contactController'
  })
  .when('/resume', {
    templateUrl: 'pages/resume.html',
    controller: 'resumeController'
  });
});
