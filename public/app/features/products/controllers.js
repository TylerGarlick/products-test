"use strict";

angular.module('productsManager')
  .controller('productsCtrl', ['$scope', '$aside', 'ProductServices', 'flashr',
    function ($scope, $aside, ProductServices, Flashr) {

      function loadProducts() {
        $scope.products = ProductServices.all();
      }

      loadProducts();




      $scope.save = function (product) {
        if (!product._id) {
          return ProductServices.create(product).$promise.then(function () {
            loadProducts();
            Flashr.later.success('Product created successfully');
          });
        } else {
          return ProductServices.update(product).$promise.then(function () {
            loadProducts();
            Flashr.later.success('Product updated successfully');
          });
        }
      };



      $scope.delete = function (product) {
        return ProductServices.delete(product._id).$promise.then(loadProducts);
      }
    }]);