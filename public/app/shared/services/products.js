"use strict";

angular.module('productsManager')
  .factory('ProductServices', ['$http',
    function ($http) {
      var baseUrl = '/v1/products';
      return {
        all: function () {
          return $http.get(baseUrl);
        },
        create: function (product) {
          return $http.post(baseUrl, product);
        },
        update: function (product) {
          var url = baseUrl + '/' + product._id;
          return $http.put(url, product);
        },
        delete: function (id) {
          var url = baseUrl + '/' + id;
          return $http.delete(url);
        }
      }
    }]);