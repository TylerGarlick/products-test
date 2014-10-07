"use strict";

var Promise = require('bluebird'),
  Product = require('../models/product');

/**
 * Seed the database
 * @returns {Promise}
 */
module.exports = function () {
  var promises = [
    new Product({ name: 'Product 1', description: 'Product 1 description', price: 10.99 }).save(),
    new Product({ name: 'Product 2', description: 'Product 2 description', price: 1.99 }).save(),
    new Product({ name: 'Product 3', description: 'Product 3 description', price: 6.99 }).save()
  ];
  return Promise.all(promises);
};
