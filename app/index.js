'use strict';

const angular = require('angular');
require('angular-route');

const app = angular.module('myApp', ['ngRoute']);

//controllers
require(__dirname + '/controllers/about.js')(app);
require(__dirname + '/controllers/contact.js')(app);
require(__dirname + '/controllers/main.js')(app);
require(__dirname + '/controllers/project.js')(app);

//services
require(__dirname + '/services/auth-service.js')(app);


//Directives
require(__dirname + '/directives/resume.js')(app);
require(__dirname + '/directives/project.js')(app);

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
