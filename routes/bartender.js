var mongoose = require('mongoose');

var db = require('./database');

var Schema = mongoose.Schema;

var EmployeesSchema = new Schema({
    _id : Schema.ObjectId,
    name : String
},  {versionKey: false} );

module.exports = db.model('employee',EmployeesSchema);