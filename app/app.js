'use strict';

(function(){
  var contact = { name: ' Lisa Wenke', phone: '206-383-1273', email: 'lwenke@gmail.com'};
  // var gitRoute = 'https://api.github.com/users/lwenke01';
  var app = angular.module("myPortfolio", []);
  app.controller('GameController', ['$http','HttpService', function($http, HttpService){
  const userName= 'lwenke01';

  const repoHttp = HttpService(userName + '/repos');
  const starHttp = HttpService(userName+ 'repos/starred');
  const userHttp = HttpService(userName);

  app.directive('customContact', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/portfolio-contact.html',
      controller:function($http){
        this.userInfo = contact;
      },
      controllerAs: 'contactCtrl'
    };
  });
  app.directive('customNav', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/portfolio-tabs.html',
      controller: function(){
        this.tab = 1;
        this.isSet = function(check){
          return this.tab === check;
        };
        this.setTab = function(active){
          this.tab = active;
        };
      },
      controllerAs: 'tabCtrl'
    };
  });
  app.directive('customProject',['HttpService', function(HttpService){
    return {
      restrict: 'E',
      templateUrl: './templates/portfolio-projects.html',
      controller:function(repo){
        repoHttp.getRepo(repo)
        .then((result)=>{
          this.repos = result.data;
        });
      },
      controllerAs: 'projectCtrl'
    };
  }]);
  app.directive('customHome', ['HttpService', function(HttpService){
    return {
      restrict: 'E',
      templateUrl: './templates/portfolio-home.html',
      controller:function(user){
        userHttp.getUser(user)
        .then((result)=>{
          this.user = result.data;
        });
      },
      controllerAs:'homeCtrl'
    };
  }]);
  app.directive('customResume', function(){
    return {
      retrict: 'E',
      templateUrl: './templates/portfolio-resume.html',
      controller:function($http){
        $http.get('./data-json/educationData.json')
        .then((result)=>{
          this.schools = result.data;
        });
      },
      controllerAs: 'resumeCtrl'
    };
  });
  app.directive('customResources', function(){
    return {
      restrict: 'E',
      templateUrl: './templates/portfolio-resources.html'
    };
  });
  app.directive('directiveLink', function(){
    return {
      restrict: 'A',
      replace: true,
      link: function($scope, element) {
        element.css('border-radius', '25px');
        element.css('text-align', 'center');
        element.css('color', 'blue');
        element.css('font-size', '3em');
        element.css('transform', 'translateX(10px) rotate(10deg) translateY(5px)');

       }
     };
   });
})
}();
