var mongoose = require('mongoose');

var db = require('./Database');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    _id : Schema.ObjectId,
    name : String,
    billing_address : String
});

module.exports = db.model('customer',CustomerSchema);