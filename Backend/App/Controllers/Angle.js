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

                const client = await Clients_Modal.findById(key);

                if (!client) {
                    return res.status(404).json({
                        status: false,
                        message: "Client not found"
                    });
                }
                var auth_token = keystr.split('?auth_token=')[1];
                const brokerlink = await Clients_Modal.findByIdAndUpdate(
                    key, 
                    { 
                        authtoken: auth_token,  // Update authtoken
                        dlinkstatus: 1,         // Update dlinkstatus
                        tradingstatus: 1        // Update tradingstatus
                    }, 
                    { new: true }  // Return the updated document
                );
                  return res.json({
                    status: true,
                    message: "Broker login successfully",
                });
               
            } else {

                return res.status(500).json({ status: false, message: "Server error" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: error });

        }
      
    }


}

module.exports = new Angle();