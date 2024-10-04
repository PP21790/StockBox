var axios = require('axios');
var dateTime = require('node-datetime');
const sha256 = require('js-sha256');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;
const Signal_Modal = db.Signal;
const Stock_Modal = db.Stock;

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
            const { id, signalid, quantity, price } = req.body;
    
            const client = await Clients_Modal.findById(id);
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }


            if(client.tradingstatus == 0)
            {
                return res.status(404).json({
                    status: false,
                    message: "Client Broker Not Login, Please Login With Broker"
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


             let optiontype, exchange, producttype;

             if (signal.segment === "C") {
                 optiontype = "EQ";
                 exchange = "NSE";
             } else {
                 optiontype = signal.segment === "F" ? "UT" : signal.optiontype;
                 exchange = "NFO";
             }
             
             // Determine product type based on segment and call duration
             if (signal.callduration === "Intraday") {
                 producttype = "MIS";
             } else {
                 producttype = signal.segment === "C" ? "CNC" : "NRML";
             }
             
             // Query Stock_Modal based on segment type
             let stock;
             if (signal.segment === "C") {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     option_type: optiontype 
                 });
             } else if (signal.segment === "F") {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                     option_type: optiontype 
                 });
             } else {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                     option_type: optiontype, 
                     strike: signal.strikeprice 
                 });
             }


             if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: "Stock not found"
                });
            }


           
                var data = JSON.stringify([
                    {
                      "complexty": "regular",
                      "discqty": "0",
                      "exch": exchange,
                      "pCode": producttype,
                      "prctyp": "MKT",
                      "price": price,
                      "qty": quantity,
                      "ret": "DAY",
                      "symbol_id": stock.instrument_token,
                      "trading_symbol": signal.stock,
                      "transtype": signal.calltype,
                      "trigPrice": "00.00",
                      "orderTag": "order1"
                    }
                  ]);


                 


                //   var data_possition = {
                //     "ret": "DAY"
                //     }
                // var config = {
                //     method: 'post',
                //     url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/positionAndHoldings/positionBook',
                //     headers: {
                //         'Authorization': 'Bearer ' + userId + ' ' + authToken,
                //         'Content-Type': 'application/json'
                //     },
                //     data: JSON.stringify(data_possition)
                // };

    
                //   let config = {
                //     method: 'get',
                //     url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/fetchOrderBook',
                //     headers: {
                //         'Authorization': 'Bearer ' + userId + ' ' + authToken,
            
                //         'Content-Type': 'application/json',
                //     },
                //     data: ""
            
                // };

    

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/placeOrder/executePlaceOrder',
                    headers: {
                        'Authorization': 'Bearer ' + userId + ' ' + authToken,
            
                        'Content-Type': 'application/json',
                    },
                    data: data
            
                };


    
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