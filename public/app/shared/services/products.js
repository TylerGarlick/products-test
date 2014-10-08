"use strict";

angular.module('productsManager')
  .factory('ProductServices', ['Product', function (Product) {
    return {
      all: function () {
        return Product.query();
      },
      create: function (product) {
        var product = new Product(product);
        return product.$save();
      },
      update: function (product) {
        return Product.update({ id: product._id }, product);
      },
      delete: function (id) {
        return Product.delete({ id: id });
      }
    }
  }]);