(function(app){

angular.module('data')
.factory('DataService', ['$http', function($http){
  const mainRoute = './data-json/';

  function History(dataFile){
    this.dataFile = dataFile;
  }
History.prototype.getAll = function($http){
    return $http.get(mainRoute + this.dataFile);
};
// History.prototype.getAllWork = function($http){
//   return $http.get(mainRoute + this.dataFile);
// };
//
return function(dataFile){
  return new History(dataFile);
};


    }]);

  })();
