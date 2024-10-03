var axios = require('axios');
var dateTime = require('node-datetime');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;
const Signal_Modal = db.Signal;


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
                        dlinkstatus: 1,                        // Update dlinkstatus
                        tradingstatus: 1                       // Update tradingstatus
                    }, 
                    { 
                        new: true, // Return the updated document
                        useFindAndModify: false // Prevent deprecation warning (optional)
                    }
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

            // var config = {
            //     method: 'get',
            //     url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getProfile',
              
            //     headers : {
            //       'Authorization': `Bearer ${authToken}`,
            //       'Content-Type': 'application/json',
            //       'Accept': 'application/json',
            //       'X-UserType': 'USER',
            //       'X-SourceID': 'WEB',
            //       'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
            //       'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
            //       'X-MACAddress': 'MAC_ADDRESS',
            //       'X-PrivateKey': client.apikey
            //     }
            //   };
              
            //   axios(config)
            //   .then(function (response) {
            //     console.log(JSON.stringify(response.data));
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });

       

           
            var data = JSON.stringify({
                "variety":"NORMAL",
                "tradingsymbol":"SBIN-EQ",
                "symboltoken":"3045",
                "transactiontype":"BUY",
                "exchange":"NSE",
                "ordertype":"MARKET",
                "producttype":"INTRADAY",
                "duration":"DAY",
                "price":"194.50",
                "squareoff":"0",
                "stoploss":"0",
                "quantity":"1"
                });
    
    
    

            const config = {
                method: 'get',
            //    url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/placeOrder',
                url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getOrderBook',
              
                headers: { 
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                    'X-UserType': 'USER', 
                    'X-SourceID': 'WEB', 
                    'X-ClientLocalIP': 'CLIENT_LOCAL_IP', // Replace with actual IP
                    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP', // Replace with actual IP
                    'X-MACAddress': 'MAC_ADDRESS', // Replace with actual MAC address
                    'X-PrivateKey': client.apikey // Replace with actual API key
                },
                data: data
            };

            console.log(config);

    
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

module.exports = new Angle();