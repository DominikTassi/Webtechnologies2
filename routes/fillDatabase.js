const express = require('express');
const router = express.Router();
const Bartender = require('./bartender');
const Order = require('./order');
const Food = require('./food');
const Costumer = require('./costumer');
const mongoose = require('mongoose');

const getTotalPrice = function (foods) {
    let totalPrice = 0;
    foods.forEach(function (item) {
        totalPrice += Number(item.price);
    });
    return totalPrice;
};

//Initialize db
router.get('/initdb', function (req, res) {
    //Data to add
    const bartenders = [
        {name: "Berényi Miklós"},
        {name: "Böde Dániel"},
        {name: "Mészáros Lőrinc"}
    ];

    bartenders.forEach((item) => {
        Bartender.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['name']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("error!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    //Data to add
    const costumers = [
        {name: "Berényi András", billing_address: "Budapest Mátyás király tér 1."},
        {name: "Kiss Éva", billing_address: "Miskolc Eper utca 2."},
        {name: "Barna Piroska", billing_address: "Szerencs Fő út 100."},
        {name: "Lakatos Belmondó", billing_address: "Taktaszada Rózsadomb 5/A"},
        {name: "Tassi Dominik", billing_address: "Golop Kossuth út 70."},
        {name: "Simon István", billing_address: "Budapest Hős utca 15."},
    ];

    costumers.forEach((item) => {
        Costumer.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['name'],
            billing_address: item['billing_address']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("error!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    //Data to add
    const foods = [
        {type: "Drink", name: "Borsodi Beer", price: 450, ingredients: ["500ml"]},
        {type: "Drink", name: "Hell Energy Classic", price: 300, ingredients: ["250ml"]},
        {type: "Drink", name: "Tokaji Wine", price: 500, ingredients: ["250ml"]},
        {type: "Food", name: "Pizza Roma", price: 1500, ingredients: ["Tomato base", "Ham", "Corn", "Cheese"]},
        {type: "Food", name: "Pizza Inferno", price: 1500, ingredients: ["Tomato base", "Pepperoni", "Cheese"]},
        {type: "Food", name: "Hamburger", price: 1000, ingredients: ["Beef", "Vegetables", "Cheese"]},
        {type: "Food", name: "Meat Soup", price: 750, ingredients: ["Meat", "Vegetables", "Noodles"]}
    ];

    foods.forEach((item) => {
        Food.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            type: item['type'],
            name: item['name'],
            price: item['price'],
            ingredients: item['ingredients']
        }, (err, doc) => { //Error Handler
            if (err !== null) {
                console.log("error!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    //Data to add
    const orders = [
        {
            status: "Open",
            fulfilled: true,
            received: true,
            foods: [
                {name: "Pizza Roma", price: 1500},
                {name: "Hell Energy Classic", price: 300}
            ],
            bartendersName: "Böde Dániel",
            costumersName: "Tassi Dominik"
        },
        {
            status: "Open",
            fulfilled: true,
            received: false,
            foods: [
                {name: "Meat Soup", price: 750},
                {name: "Tokaji Wine", price: 500}
            ],
            bartendersName: "Berényi Miklós",
            costumersName: "Berényi András"
        },
        {
            status: "Open",
            fulfilled: false,
            received: true,
            foods: [
                {name: "Borsodi Beer", price: 450,},
                {name: "Borsodi Beer", price: 450,},
                {name: "Borsodi Beer", price: 450,},
                {name: "Borsodi Beer", price: 450,}],
            bartendersName: "Mészáros Lőrinc",
            costumersName: "Barna Piroska"
        },
        {
            status: "Closed",
            fulfilled: true,
            received: true,
            foods: [
                {name: "Meat Soup", price: 750}
            ],
            bartendersName: "Berényi Miklós",
            costumersName: "Lakatos Belmondó"
        }
    ];
    let ordersFood;
    let price = 0;


    orders.forEach(function (item) {
        ordersFood = item['foods'];
        price = getTotalPrice(ordersFood);

        Order.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            status: item['status'],
            fulfilled: item['fulfilled'],
            received: item['received'],
            foods: ordersFood,
            bartendersName: item['bartendersName'],
            costumersName: item['costumersName'],
            totalCost: price
        }, function (err, doc) { //Error Handler
            if (err !== null) {
                console.log("error!" + err.toString());
                console.log(doc);
                return res.status(415).send(doc);
            }
        });
    });
    res.status(200).send("Database Initialized");
});

module.exports = router;