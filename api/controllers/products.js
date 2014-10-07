"use strict";

var Boom = require('boom'),
  Joi = require('joi');

var ProductService = require('../services/products'),
  Product = require('../models/product');
var productService = new ProductService();

var internals = {};

internals.save = function (request, reply) {
  var product = new Product(request.payload);
  productService.save(product)
    .then(function (product) {
      return reply(product);
    }).catch(function (err) {
      if (err.name === 'OperationalError')
        return reply(Boom.badRequest(err, product));
      else {
        return reply(Boom.badImplementation(err));
      }
    });
};

exports.query = {
  description: "Get all the products",
  handler: function (request, reply) {
    productService.query()
      .then(function (products) {
        return reply(products);
      });
  }
};

exports.get = {
  description: "Get a product by it's Id",
  validate: {
    params: {
      id: Joi.string().required()
    }
  },
  handler: function (request, reply) {
    productService.byId(request.params.id)
      .then(function (product) {
        return reply(product);
      }).catch(function (err) {
        return reply(Boom.notFound(err));
      });
  }
};

exports.post = {
  description: "Create a product",
  validate: {
    payload: productService.schema
  },
  handler: internals.save
};

exports.put = {
  description: "Update a product",
  validate: {
    payload: productService.schema
  },
  handler: internals.save
};

exports.delete = {
  description: "Delete a product",
  validate: {
    params: {
      id: Joi.string().required()
    }
  },
  handler: function (request, reply) {
    productService.remove(request.params.id)
      .then(function () {
        return reply("Product was deleted successfully")
      }).catch(function (err) {
        return reply(Boom.badImplementation(err));
      });
  }
};