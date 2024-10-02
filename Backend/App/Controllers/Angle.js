var axios = require('axios');
var dateTime = require('node-datetime');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;

class Angle {

    async GetAccessToken(req, res) {
        try {

            var keystr = req.query.key;
            if (keystr != undefined) {
                var key = keystr.split('?auth_token=')[0];
                var auth_token = keystr.split('?auth_token=')[1];
               
            } else {

            }
        } catch (error) {
            console.log("Error-", error);
        }
      
    }


}

module.exports = new Angle();