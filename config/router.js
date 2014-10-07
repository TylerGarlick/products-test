"use strict";

var RequireDirectory = require('require-directory');

var controllers = RequireDirectory(module, '../api/controllers');

exports.endpoints = [

  { method: 'GET', path: '/v1/products', config: controllers.products.query },
  { method: 'GET', path: '/v1/products/{id}', config: controllers.products.get },
  { method: 'POST', path: '/v1/products', config: controllers.products.post },
  { method: 'PUT', path: '/v1/products/{id}', config: controllers.products.put },
  { method: 'DELETE', path: '/v1/products/{id}', config: controllers.products.delete },

  //Static Files
  { method: 'GET', path: '/{param*}', config: controllers.statics.get }
];