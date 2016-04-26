'use strict';

module.exports = (app) => {
  app.factory('HttpService', ['$http', function($http){
    const mainRoute = 'https://api.github.com/users/';
    const jsonRoute = './data-json/'

    function RouteService(routeName){
    this.routeName = routeName;
  }
    RouteService.prototype.getUser = function(){
      return $http.get(mainRoute + this.routeName);
    }
    RouteService.prototype.getEducation = function(){
      return $http.get(jsonRoute + this.routeName);
    }
    RouteService.prototype.getRepo = function(){
      return $http.get(mainRoute +  this.routeName);
    }
    RouteService.prototype.getStarred = function(){
      return $http.get(mainRoute +  this.routeName);
    }
    RouteService.prototype.getWork = function(){
      return $http.get(jsonRoute + this.routeName);
    }
    return function(routeName){
      return new RouteService(routeName);
    }
    };

  }]);

};
