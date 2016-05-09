'use strict';

var angular = require('angular');
require('angular-route');

var app = angular.module('myApp', ['ngRoute']);


  app.factory('DataService', ['$http', function($http){
    const mainRoute = './data-json/'
    function DataService(dataFile){
      this.dataFile = dataFile;
    }
    DataService.prototype.getAllEducation = function($http){
      return $http.get(mainRoute + 'educationData.json');
  }
  DataService.prototype.getAllWork = function($http){
    return $http.get(mainRoute + 'employmentData.json');
}

      }]);


  app.controller('WorkController', function (DataService){
       DataService.getAllWork()
       .then((result)=>{
         this.jobs = result.data;
       });
  });

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


  app.directive('customEducation', function(){
    return {
      retrict: 'E',
      templateUrl: './templates/portfolio-school.html'
    };
  });
  app.directive('customWork', function(){
    return {
      retrict: 'E',
      templateUrl: './templates/portfolio-work.html'
    };
  });

  // app.directive('directiveLink', function(){
  //   return {
  //     restrict: 'A',
  //     replace: true,
  //     link: function($scope, element) {
  //       element.css('border-radius', '25px');
  //       element.css('text-align', 'center');
  //       element.css('color', 'blue');
  //       element.css('font-size', '3em');
  //       element.css('transform', 'translateX(10px) rotate(10deg) translateY(5px)');
  //
  //      }
  //    };
  //  });
})();
