'use strict';

(function(){

var app = angular.module('school');

app.contoller('SchoolController', ['$http', 'DataService', SchoolController])

app.directive('customSchool', function(){
    return {
      retrict: 'E',
      templateUrl: './templates/portfolio-school.html',
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
