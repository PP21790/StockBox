var axios = require('axios');
var dateTime = require('node-datetime');
const sha256 = require('js-sha256');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;
const Signal_Modal = db.Signal;

class Aliceblue {

    async GetAccessToken(req, res) {
        try {
            const alice_userid = req.query.userId;
            const client = await Clients_Modal.findOne({ alice_userid });
    
            // Check if the client exists
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }
    
            // Check for authCode in the request
            if (req.query.authCode) {
                const authCode = req.query.authCode;
                const appcode = req.query.appcode;
    
                // Create the encrypted data using sha256
                const encryptedData = sha256(alice_userid + authCode + client.apisecret);
                const data = { checkSum: encryptedData };
    
                // Axios configuration
                const config = {
                    method: "post",
                    url: "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/sso/getUserDetails",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };
    
                try {
                    const response = await axios(config);
                    // Check if the response status is not OK
                    if (response.data.stat === "Not_ok") {
                        return res.status(500).json({ status: false, message: response.data.emsg });
                    }
    
                    // If userSession exists, update the client's data
                    if (response.data.userSession) {
                        const brokerlink = await Clients_Modal.findOneAndUpdate(
                            { alice_userid }, // Find by alice_userid
                            { 
                                authtoken: response.data.userSession,  // Update authtoken
                                dlinkstatus: 1,         // Update dlinkstatus
                                tradingstatus: 1        // Update tradingstatus
                            }, 
                            { new: true }  // Return the updated document
                        );
    
                        return res.json({
                            status: true,
                            message: "Broker login successfully",
                        });
                    }
    
                } catch (error) {
                    return res.status(500).json({ status: false, message: "Server error" });
                }
    
            } else {
                return res.status(400).json({ status: false, message: "authCode is required" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message || "Server error" });
        }
    }


    async placeOrder(req, res) {
        
        try {
            const { id, signalid } = req.body;
    
            const client = await Clients_Modal.findById(id);
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }
    
            const signal = await Signal_Modal.findById(signalid);
            if (!signal) {
                return res.status(404).json({
                    status: false,
                    message: "Signal not found"
                });
            }
   
             const authToken = client.authtoken;
             const userId = client.alice_userid;

           
                var data = JSON.stringify([
                    {
                      "complexty": "regular",
                      "discqty": "0",
                      "exch": "NSE",
                      "pCode": "MIS",
                      "prctyp": "L",
                      "price": "3550.00",
                      "qty": 1,
                      "ret": "DAY",
                      "symbol_id": "212",
                      "trading_symbol": "ASHOKLEY-EQ",
                      "transtype": "BUY",
                      "trigPrice": "00.00",
                      "orderTag": "order1"
                    }
                  ]);


                 

    
                //   let config = {
                //     method: 'get',
                //     url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/fetchOrderBook',
                //     headers: {
                //         'Authorization': 'Bearer ' + userId + ' ' + authToken,
            
                //         'Content-Type': 'application/json',
                //     },
                //     data: ""
            
                // };

    

                // let config = {
                //     method: 'post',
                //     maxBodyLength: Infinity,
                //     url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/executePlaceOrder',
                //     headers: {
                //         'Authorization': 'Bearer ' + userId + ' ' + authToken,
            
                //         'Content-Type': 'application/json',
                //     },
                //     data: data
            
                // };


    
            const response = await axios(config);
            console.log(JSON.stringify(response.data)); // Log the response data
    
            return res.json({
                status: true,
                data: response.data // Include response data
            });
    
        } catch (error) {
            console.error("Error placing order:", error); // Log the error
            return res.status(500).json({ 
                status: false, 
                message: error.response ? error.response.data : "An error occurred while placing the order" 
            });
        }
    }

}

module.exports = new Aliceblue();