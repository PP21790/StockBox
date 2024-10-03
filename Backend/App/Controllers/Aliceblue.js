var axios = require('axios');
var dateTime = require('node-datetime');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;

class Aliceblue {

    async GetAccessToken(req, res) {
            console.log(req.query);
       }


}

module.exports = new Aliceblue();