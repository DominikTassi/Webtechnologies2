var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bartender = require('./routes/bartenderEndPoint');
var food = require('./routes/foodEndPoint');
var manager = require('./routes/managerEndPoint');
var admin = require('./routes/fillDatabase');
var customer = require ('./routes/costumerEndPoint');
var order = require('./routes/orderEndPoint')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/',bartender);
app.use('/',food);
app.use('/',customer);
app.use('/',admin);
app.use('/',manager);
app.use('/',order);

app.listen(8080, function(){console.log("Server listens on 8080.")});;