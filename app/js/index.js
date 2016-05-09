'use strict';

require(__dirname + '/../css/normalize.css');
require(__dirname + '/../css/main.css');
require(__dirname + '/../css/animate.css');
require(__dirname + '/customers/customer-module.js');
require(__dirname + '/customers/customers.js');
require(__dirname + '/products/products-module.js');
require(__dirname + '/products/products.js');
require(__dirname + '/services/service.js');

(function() {
  angular.module('app', [
    'customers',
    'products'
  ]);
})();
