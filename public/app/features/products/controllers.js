"use strict";

angular.module('productsManager')
  .controller('productsCtrl', ['$scope', '$aside', 'ProductServices',
    function ($scope, $aside, ProductServices) {

      var editModal, deleteModal;


      function loadProducts() {
        $scope.products = ProductServices.all();
      }

      loadProducts();


      $scope.new = function () {
        $scope.product = {};
        editModal = $aside({
          backdrop: 'static',
          placement: 'right',
          keyboard: false,
          template: 'app/features/products/templates/edit.html',
          container: 'body',
          title: 'New Product',
          scope: $scope
        });
      };

      $scope.edit = function (product) {
        $scope.product = product;
        console.log($scope.product._id);
        editModal = $aside({
          backdrop: 'static',
          placement: 'right',
          keyboard: false,
          template: 'app/features/products/templates/edit.html',
          container: 'body',
          title: 'Edit Product',
          scope: $scope
        });
      };

      $scope.save = function (product) {
        if (!product._id) {
          return ProductServices.create(product).$promise.then(loadProducts);
        } else {
          return ProductServices.update(product).$promise.then(loadProducts);
        }
      };

      $scope.canDelete = function (product) {
        $scope.product = product;
        console.log($scope.product._id);
        deleteModal = $aside({
          backdrop: 'static',
          placement: 'right',
          keyboard: false,
          template: 'app/features/products/templates/delete.html',
          container: 'body',
          title: 'Delete Product',
          scope: $scope
        });
      };

      $scope.delete = function (product) {
        return ProductServices.delete(product._id).$promise.then(loadProducts);
      }
    }])
  .controller('editProduct', ['$scope', '$aside', 'Product',
    function ($scope, $aside, Product) {

    }]);