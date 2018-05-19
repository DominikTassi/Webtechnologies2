const express = require('express');
const router = express.Router();
const Bartender = require('./bartender');
const mongoose = require('mongoose');

router.post("/bartender/add", function (req, res) {
    Bartender.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: item['name']
    }, (err, doc) => {
        if (err !== null) { //Error Handler
            console.log("error!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

router.get("/bartender/getBartenders", function (req, res) {
    Bartender.find({}).exec((err, doc) => {
        res.status(200).send(doc);
    });
});

router.get("/bartender/rnd", function (req, res) {
    Bartender.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        Bartender.findOne().skip(random).exec(function (err, doc) {
            if (err) {
                res.status(415).send(err.toString());
            }
            res.status(200).send(doc);
        });
    });
});


module.exports = router;