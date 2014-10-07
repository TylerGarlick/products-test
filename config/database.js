"use strict";

var Mongoose = require('mongoose');
var db = Mongoose.connect('mongodb://localhost:27017/product-test');
//var db = Mongoose.connect('mongodb://product-test:orange5@linus.mongohq.com:10039/product-test');

module.exports = db;