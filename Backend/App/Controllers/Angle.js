var axios = require('axios');
var dateTime = require('node-datetime');
"use strict";
const db = require("../Models");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Clients_Modal = db.Clients;
const Signal_Modal = db.Signal;
const Stock_Modal = db.Stock;
const Order_Modal = db.Order;


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
                 producttype = "INTRADAY";
             } else {
                 producttype = signal.segment === "C" ? "DELIVERY" : "CARRYFORWARD";
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



            var data = JSON.stringify({
                "variety":"NORMAL",
                "tradingsymbol":stock.tradesymbol,
                "symboltoken":stock.instrument_token,
                "transactiontype":signal.calltype,
                "exchange":exchange,
                "ordertype":"MARKET",
                "producttype":producttype,
                "duration":"DAY",
                "price":price,
                "squareoff":"0",
                "stoploss":"0",
                "quantity":quantity
                });

              
                // var config = {
                //     method: 'get',
                //     url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/portfolio/v1/getAllHolding',
                // //    url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getPosition',
                //     headers: {
                //         'Authorization': `Bearer ${authToken}`,
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json',
                //         'X-UserType': 'USER',
                //         'X-SourceID': 'WEB',
                //         'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                //         'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                //         'X-MACAddress': 'MAC_ADDRESS',
                //         'X-PrivateKey': client.apikey
                //     },
                // };



            const config = {
                method: 'post',
                url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/placeOrder',
              //  url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getOrderBook',
              
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

            const response = await axios(config);
       
            if (response.data.message == 'SUCCESS') {


                const order = new Order_Modal({
                    clientid: client._id,
                    signalid:signal._id,
                    orderid:response.data.data.orderid,
                    borkerid:1,
                });


               await order.save();

            return res.json({
                status: true,
                data: response.data ,
                message: "Order Placed Successfully" 
            });
        }
        else{
            let url;
            if(response.data.message=="Invalid Token") {
              url = `https://smartapi.angelone.in/publisher-login?api_key=${client.apikey}`;
            }
               return res.status(500).json({ 
                status: false, 
                url: url, 
                message: response.data.message 
            });
        }
    
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