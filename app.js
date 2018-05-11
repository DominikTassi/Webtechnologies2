var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bartender = require('./routes/BartenderEndPoint');
var food = require('./routes/FoodEndPoint');
var manager = require('./routes/ManagerEndPoint');
var admin = require('./routes/FillDatabase');
var customer = require ('./routes/CostumerEndPoint');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/',bartender);
app.use('/',food);
app.use('/',customer);
app.use('/',admin);
app.use('/',manager);

app.listen(8080, function(){console.log("Server listens on 8080.")});