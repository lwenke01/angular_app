'use strict';

module.exports = function(app) {


app.directive('customContact', function(){
    return {
      retrict: 'E',
      templateUrl: './pages/contact.html'
    };
  });

  app.directive('customHeader', function(){
      return {
        retrict: 'E',
        templateUrl: './pages/header.html'
      };
    });



  app.directive('customNav', function(){
    return {
      restrict: 'E',
      templateUrl: './pages/portfolio-tabs.html',
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


};
