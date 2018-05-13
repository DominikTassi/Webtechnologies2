var mongoose = require('mongoose');

var db = require('./database');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    billing_address : String
}, {versionKey: false});

module.exports = db.model('customer',CustomerSchema);