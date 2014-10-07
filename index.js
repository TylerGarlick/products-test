"use strict";

var Hapi = require('hapi');

var Db = require('./config/database'),
  Router = require('./config/router');

var port = process.env.PORT || 3000;
var server = new Hapi.Server(port);

server.route(Router.endpoints);


server.pack.register([
  { plugin: require('good') },
  { plugin: require('hapi-statsd') },
  { plugin: require('lout') },
  {
    plugin: require('hapi-mongoose-db-connector'),
    options: {
      mongodbUrl: 'mongodb://localhost:27017/product-test'
    }
  }
], function (err) {
  if (err) throw err;
  server.start(function () {
    console.log('Server started at ' + server.info.uri);
  });
});


