"use strict";

angular.module('productsManager')
  .controller('productsCtrl', ['$scope', '$aside', 'ProductServices',
    function ($scope, $aside, ProductServices) {

      function loadProducts() {
        return ProductServices.all()
          .success(function (products) {
            $scope.product = {};
            $scope.products = products;
          });
      }

      loadProducts();

      $scope.save = function (product) {
        if (!product._id) {
          return ProductServices.create(product)
            .success(function () {
              return loadProducts();
            });
        } else {
          return ProductServices.update(product)
            .success(function () {
              return loadProducts();
            });
        }
      };



      $scope.delete = function (product) {
        return ProductServices.delete(product._id).success(function () {
          return loadProducts();
        });
      }
    }]);