"use strict";

var Hapi = require('hapi')
  , Db = require('./config/database')
  , Router = require('./config/router');

var port = parseInt(process.env.PORT || 3000);
var server = new Hapi.Server('localhost', port);

server.route(Router.endpoints);


server.pack.register([
  { plugin: require('good') },
  { plugin: require('hapi-statsd') },
  { plugin: require('lout') },
  {
    plugin: require('hapi-mongoose-db-connector'),
    options: {
      mongodbUrl: Db.mongoUri
    }
  }
], function (err) {
  if (err) throw err;
  server.start(function () {
    console.log('Server started at ' + server.info.uri);
  });
});


