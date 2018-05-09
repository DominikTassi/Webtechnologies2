const express = require('express');
const router = express.Router();
const Bartender = require('./Restaurant');
const mongoose = require('mongoose');


router.get('/bar/filldb', function (req, res) {
    //Data to add
    const foods = [
        {"name": "Kiss Gábor"},
        {"name": "Nagy Béla"}
    ];

    foods.forEach((item) => {
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
    res.status(200).send("Data Inserted");
});

router.post("/bar/add", function (req, res) {
    Bartender.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: item['name']
    }, function (err, doc) {
        if (err !== null) { //Error Handler
            console.log("error!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

module.exports = router;