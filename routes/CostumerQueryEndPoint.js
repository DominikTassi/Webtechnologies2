const express = require('express');
const router = express.Router();
const Costumer = require('./Restaurant');
const mongoose = require('mongoose');


router.get('/costumer/filldb', function (req, res) {
    //Data to add
    const costumers = [
        {"name": "Kis Pista", "billing_address": "Mályinka Fő út 12."},
        {"name": "Horvát Rozi", "billing_address": "Miskolc miskolc vörösmarty utca 5."}
    ];

    costumers.forEach((item) => {
        Costumer.create({ //Add item to db
            _id: new mongoose.Types.ObjectId(),
            name: item['type'],
            billing_address: item['billing_address']
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

router.post("costumer/add", function (req, res) {
    Costumer.create({ //Add item to db
        _id: new mongoose.Types.ObjectId(),
        name: req.body['name'],
        billing_address: req.body['billing_address']
    }, function (err, doc) {
        if (err !== null) { //Error Handler
            console.log("error!" + err.toString());
            console.log(doc);
            res.status(415).send(doc);
        }
    });
});

module.exports = router;