var mongoose = require('mongoose');
var db = require('./database');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name : String,
    price : Number,
    ingredients: Array,
    type : String
}, {versionKey: false});

module.exports = db.model('food',FoodSchema);