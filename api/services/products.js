"use strict";

var Promise = require('bluebird'),
  Db = require('../../config/database'),
  Product = Promise.promisifyAll(require('../models/product')),
  _ = require('lodash'),
  Joi = require('joi');

var internals = {};
internals.validate = function (product, schema) {
  return Joi.validate(product, schema, { stripUnknown: true });
};

module.exports = ProductService;

/**
 * Product Service
 * @param {object} options
 * @constructor
 */
function ProductService(options) {
  options = options || {};

  Object.defineProperties(this, {
    schema: {
      enumerable: true, configurable: false,
      get: function () {
        return Joi.object().keys({
          name: Joi.string().min(1).required(),
          description: Joi.string(),
          price: Joi.number().min(0).precision(2).required()
        });
      }
    }
  });
}

/**
 * All products
 * @returns {Promise<products>}
 */
ProductService.prototype.query = function () {
  return Product.findAsync();
};

/**
 * Find a product by Id
 * @param {ObjectId|string} id
 * @returns {Promise<product>}
 */
ProductService.prototype.byId = function (id) {
  if (id.length == 0) throw new Error('Id is required');
  return Product.findOneAsync({ _id: id })
    .then(function (product) {
      if (!product) throw Error('Product with id ' + id + ' not found');
      return Promise.resolve(product);
    });
};

/**
 * Find a product by name
 * @param {string} name
 * @returns {Promise}
 */
ProductService.prototype.byName = function (name) {
  return Product.findOneAsync({ name: name })
    .then(function (product) {
      if (!product) throw Error('Product with name ' + name + ' not found');
      return Promise.resolve(product);
    });
};

/**
 * Save a product
 * @param {object} product
 * @returns {Promise}
 */
ProductService.prototype.save = function (product) {

  var result = internals.validate(product, this.schema);
  if (result.error) throw result.error;

  if (product.isNew) {
    Promise.promisifyAll(product);
    return product.saveAsync()
      .spread(function (product, numberAffected) {
        return Promise.resolve(product);
      });
  } else
    return Product.findByIdAndUpdateAsync(product._id, product, { upsert: true }, function (err, product) {
      if (err) throw err;
      return Promise.resolve(product);
    });
};

/**
 * Delete a product
 * @param {ObjectId|string} id
 */
ProductService.prototype.remove = function (id) {
  return Promise.resolve(Product.findOneAndRemove({ id: id }));
};

/**
 * Removes all the products
 * @returns {*|Promise}
 */
ProductService.prototype.removeAll = function () {
  var promises = [];
  return Product.findAsync()
    .each(function (product) {
      promises.push(Product.removeAsync(product));
    }).then(function () {
      return Promise.all(promises);
    });
};