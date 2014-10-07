"use strict";

var ProductService = require('../../../api/services/products'),
  Product = require('../../../api/models/product'),
  ProductSeed = require('../../../api/helpers/seed');

require('chai').should();


describe('Products Service', function () {

  var productService;
  before(function (next) {
    productService = new ProductService();
    productService.should.be.ok;
    return productService.removeAll()
      .then(function () {
        return ProductSeed()
          .then(function () {
            next();
          });
      }).done(null, next);
  });

  describe('all()', function () {
    it("will get all the documents", function (next) {
      productService.query()
        .then(function (products) {
          products.length.should.be.gte(1);
          next();
        }).done(null, next);
    });
  });

  describe('byId()', function () {

    it("gets the product by it's id", function (next) {
      productService.query()
        .then(function (products) {
          var product = products[0];
          product.should.be.ok;
          return productService.byId(product._id)
            .then(function (foundProduct) {
              foundProduct.should.be.ok;
              foundProduct.name.should.be.eql(product.name);
              foundProduct.description.should.be.eql(product.description);
              foundProduct.price.should.be.eql(product.price);
              next();
            });
        }).done(null, next);
    });

  });

  describe('save()', function () {
    it("will not save because name is required", function () {
      var product = new Product();
      (function () {
        productService.save(product)
      }).should.throw(Error);

    });
    it("will not save because price is negative", function () {
      var product = new Product({ name: 'blah', price: -7.99, description: 'blah description' });
      (function () {
        productService.save(product);
      }).should.throw(Error);
    });
    it("will save a product when all the parameters are correct", function (next) {
      var product = new Product({ name: 'blah', price: 7.99, description: 'blah description' });
      productService.save(product)
        .then(function (savedProduct) {
          savedProduct.should.be.ok;
          savedProduct.name.should.be.eql(product.name);
          savedProduct.description.should.be.eql(product.description);
          savedProduct.price.should.be.eql(product.price);
          next();
        })
    });

  });

  describe('delete()', function () {
    it("will delete with an id", function (next) {
      productService.byName('blah')
        .then(function (product) {
          product.should.be.ok;
          productService.remove(product._id)
            .then(function () {
              next();
            });
        });
    });
  });

});