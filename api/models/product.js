"use strict";

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;


var schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, min: 0, required: true }
});

module.exports = Mongoose.model('Product', schema);
