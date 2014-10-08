"use strict";

angular.module('productsManager', ['mgcrea.ngStrap', 'ngResource', 'ui.router', 'ngAnimate', 'flashr'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/products');

      $stateProvider
        .state('products', {
          abstract: true,
          url: '/products',
          templateUrl: 'app/features/products/templates/all.html',
          controller: 'productsCtrl'
        })
        .state('products.list', {
          url: '',
          controller: ['$scope', function ($scope) {
            console.log('hello world');
          }]
        });
    }]);