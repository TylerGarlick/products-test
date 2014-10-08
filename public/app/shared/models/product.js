"use strict";
angular.module('productsManager')
  .factory('Product', ['$resource',
    function ($resource) {
      return $resource('/v1/products/:id', null, {
        'update': { method: 'PUT' }
      });
    }]);