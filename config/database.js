"use strict";

var Mongoose = require('mongoose');

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/product-test';
var db = Mongoose.connect(mongoUri);

module.exports = db;
module.exports.mongoUri = mongoUri;