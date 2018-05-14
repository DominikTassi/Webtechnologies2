const express = require('express');
const router = express.Router();
const costumer = require('./costumer');
const order = require('./order');
const food = require('./food');
const mongoose = require('mongoose');



router.post("/costumer/add", function (req, res) {
    costumer.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: req.body['name'],
        billing_address: req.body['billing_address']
    }, (err, doc) => {
        if (err !== null) { //Error Handler
            console.log("error!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

router.post('/costumer/orderFood', function (req, res) {
    var foods = req.body['foods'];
    var price = 0;
    console.log(req.body['foods']);
    foods.forEach(function (item) {
        price += Number(item.price);
    });



    order.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        status: "Open",
        fulfilled: false,
        received: false,
        foods: foods,
        bartendersName: req.body['bartendersName'],
        costumersName: req.body['costumersName'],
        totalCost: price
    }, function (err, doc) { //Error Handler
        if (err !== null) {
            console.log("Hiba!" + err.toString());
            console.log(doc);
            return res.status(415).send(doc);
        }
    });
});

router.get("/listDrinks", function (req, res) {
    food.find({"type": "Drink"}).exec(function (err, doc) {
        if (err) {
            res.status(415).send(err.toString());
        }
        res.status(200).send(doc);
    });
});

router.get("/listFoods", function (req, res) {
    food.find({"type": "Food"}).exec(function (err, doc) {
        if (err) {
            res.status(415).send(err.toString());
        }
        res.status(200).send(doc);
    });
});

module.exports = router;