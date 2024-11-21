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
const qs = require("querystring");
const jwt = require("jsonwebtoken");
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

class Kotakneo {

    async  GetAccessToken(req, res) {
        try {
          const { id, apikey, apisecret, user_name, pass_word } = req.body;
      
          // Validate inputs
          if (!id || !apikey || !apisecret || !user_name || !pass_word) {
            return res.status(400).json({
              status: false,
              message: "All fields (id, apikey, apisecret, user_name, pass_word) are required",
            });
          }
      
          // Find client by ID
          const client = await Clients_Modal.findById(id);
          if (!client) {
            return res.status(404).json({ status: false, message: "Client not found" });
          }
      
          // Check trading status
          if (client.tradingstatus === "1") {
            return res.json({ status: true, message: "Broker login successfully" });
          }
      
          // Prepare API credentials
          const authString = `${apikey}:${apisecret}`;
          const authHeaderValue = `Basic ${Buffer.from(authString).toString("base64")}`;
          const tokenUrl = "https://napi.kotaksecurities.com/oauth2/token";
      
          // Validate API credentials
          if (!apikey || !apisecret || !user_name || !pass_word) {
            return res.status(400).json({
              status: false,
              message: "Please provide valid API key, secret, username, and password",
            });
          }
      
          // Step 1: Get Access Token
          const tokenResponse = await axios.post(
            tokenUrl,
            "grant_type=client_credentials",
            { headers: { Authorization: authHeaderValue } }
          );
          const access_token = tokenResponse.data.access_token;
      
          if (!access_token) {
            return res.status(500).json({ status: false, message: "Failed to obtain access token" });
          }
      
          // Step 2: Login with Access Token
          const loginResponse = await axios.post(
            "https://gw-napi.kotaksecurities.com/login/1.0/login/v2/validate",
            {
              mobileNumber: client.PhoneNo.includes("+91") ? client.PhoneNo : "+91" + client.PhoneNo,
              password: pass_word,
            },
            {
              headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
            }
          );


          console.log(loginResponse);
      
          const { token: stepOneToken, sid: stepOneSID, hsServerId: stepHsServerId } = loginResponse.data.data;
          const decodeAccessToken = jwt.decode(stepOneToken);
      
          // Step 3: Generate OTP
          const otpResponse = await axios.post(
            "https://gw-napi.kotaksecurities.com/login/1.0/login/otp/generate",
            {
              userId: decodeAccessToken.sub,
              sendEmail: true,
              isWhitelisted: true,
            },
            {
              headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
            }
          );
      
          if (otpResponse.status === 201) {
            // Update Client Information
            await Clients_Modal.findByIdAndUpdate(
              id,
              {
                oneTimeToken: access_token,
                kotakneo_sid: stepOneSID,
                kotakneo_userd: decodeAccessToken.sub,
                hserverid: stepHsServerId,
                authtoken: stepOneToken,
                apisecret,
                apikey,
                brokerid: 3
             
              },
              { new: true }
            );
      
            return res.json({ status: true, message: "Otp Generate Successfully" });
          } else {
            return res.status(500).json({ status: false, message: "OTP generation failed" });
          }
        } catch (error) {
          // Handle Errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.error
              ? error.response.data.error[0]?.message || "Error occurred"
              : JSON.stringify(error.response.data);
            return res.status(500).json({ status: false, message: errorMessage });
          }
          return res.status(500).json({ status: false, message: error.message || "Server error" });
        }
      }


      async  checkOtp(req, res) {
        try {
          const { id, otp } = req.body;
      
          // Validate inputs
          if (!id || !otp ) {
            return res.status(400).json({
              status: false,
              message: "All fields (id, otp) are required",
            });
          }
      
          // Find client by ID
          const client = await Clients_Modal.findById(id);
          if (!client) {
            return res.status(404).json({ status: false, message: "Client not found" });
          }
      
          // Check trading status
          if (client.tradingstatus === "1") {
            return res.json({ status: true, message: "Broker login successfully" });
          }
      
          // Prepare API credentials
        
      
          // Validate API credentials
          if (!client.apikey || !client.apisecret) {
            return res.status(400).json({
              status: false,
              message: "Please provide valid API key, secret, username, and password",
            });
          }
      


          var data2 = JSON.stringify({
            userId: client.kotakneo_userd,
            otp: otp,
          });

          var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://gw-napi.kotaksecurities.com/login/1.0/login/v2/validate",
            headers: {
              accept: "*/*",
              sid: client.kotakneo_sid,
              Auth: client.authtoken,
              "Content-Type": "application/json",
              Authorization: "Bearer " + client.oneTimeToken,
            },
            data: data2,
          };
      

          const response = await axios.request(config);




          if (response.status === 201) {
            // Update Client Information
            let AccessToken = response.data.data.token;
            await Clients_Modal.findByIdAndUpdate(
              id,
              { 
                authtoken: AccessToken,
                dlinkstatus: 1,
                tradingstatus: 1,
              },
              { new: true }
            );
      
            return res.json({ status: true, message: "Broker login successfully" });
          } else {
            return res.status(500).json({ status: false, message: "OTP generation failed" });
          }
        } catch (error) {
          // Handle Errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.error
              ? error.response.data.error[0]?.message || "Error occurred"
              : JSON.stringify(error.response.data);
            return res.status(500).json({ status: false, message: errorMessage });
          }
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
             let optiontype, exchange, producttype;

             if (signal.segment === "C") {
                 exchange = "nse_cm";
             } else {
                 optiontype = signal.segment === "F" ? "UT" : signal.optiontype;
                 exchange = "nse_fo";
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
                 //    option_type: optiontype 
                 });
             } else if (signal.segment === "F") {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                  //   option_type: optiontype 
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



            let calltype;
             if(signal.calltype=="BUY")
               {
                calltype="B";
               }
              else{
                 calltype="S";
               }

            
               const pattern = stock.instrument_token;
               let ts = null; // Initialize `ts` with a default value

               let filePath_token;

               if (signal.segment.toLowerCase() === 'o') {
                   filePath_token = '../../tokenkotakneo/KOTAK_NFO.csv';
               } else if (signal.segment.toLowerCase() === 'f') {
                   filePath_token = '../../tokenkotakneo/KOTAK_NFO.csv';
               } else {
                   filePath_token = '../../tokenkotakneo/KOTAK_NSE.csv';
               }
               
               const filePath1 = path.join(__dirname, filePath_token);
               
               fs.readFile(filePath1, 'utf8', (err, data) => {
                   if (err) {
                       console.error(`Error reading file: ${err}`);
                       return;
                   }
               
                   const lines = data.split('\n');
                   let matchedLines;
               
                   if (signal.segment.toLowerCase() === 'o') {
                       matchedLines = lines.filter(line => 
                           new RegExp(`.*(${pattern}).*.*(nse_fo).*.*(${input_symbol}).*.*(${optiontype}).*`, 'i').test(line)
                       );
                   } else if (signal.segment.toLowerCase() === 'f') {
                       matchedLines = lines.filter(line => 
                           new RegExp(`.*(${pattern}).*.*(nse_fo).*`, 'i').test(line)
                       );
                   } else {
                       matchedLines = lines.filter(line => 
                           new RegExp(`.*(${pattern}).*.*(nse_cm).*`, 'i').test(line)
                       );
                   }
               
                   if (matchedLines.length > 0) {
                    const parts = matchedLines[0].split(','); // Extract parts from the first (and only) matched line
                    ts = parts[5]; // Get the value from the 6th column (index 5)
             

                    var data =  JSON.stringify({
                        "tk":stock.instrument_token,
                        "mp":"0",
                        "pc":producttype,
                        "dd":"NA",
                        "dq":"0",
                        "vd":"DAY",
                        "ts":ts,
                        "tt":calltype,
                        "pr":price,
                        "tp":"0",
                        "qt":quantity,
                        "es":exchange,
                        "pt":"MKT"
                    });
                    const requestData = `jData=${data}`;
              
                let url = `https://gw-napi.kotaksecurities.com/Orders/2.0/quick/order/rule/ms/place?sId=${client.hserverid}`;

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: url,
                    headers: {
                        'accept': 'application/json',
                        'Sid': client.kotakneo_sid,
                        'Auth': client.authtoken,
                        'neo-fin-key': 'neotradeapi',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + client.oneTimeToken
                    },
                    data: requestData
                };


                
axios(config)
.then(async (response) => {
    // Log full response for debugging purposes

    if (response.data.stat === 'Ok') {
        const order = new Order_Modal({
            clientid: client._id,
            signalid: signal._id,
            orderid: response.data.nOrdNo,
            borkerid: 3,
            quantity: quantity,
        });

        await order.save();

        return res.json({
            status: true,
            data: response.data,
            message: "Order Placed Successfully"
        });
    } else {
        // Log response if the status isn't 'Ok'
        console.log("Error in response:", response);
        return res.status(500).json({
            status: false,
            message: response.data.message || 'Unknown error in response'
        });
    }
})
.catch(async (error) => {
    // Log full error for debugging purposes
    console.log("Full Error:", error);

    let errorMessage = "An unknown error occurred.";

    // If the error has a response (e.g., 4xx or 5xx HTTP error)
    if (error.response) {
        console.log("Error Response Data:", error.response.data); // Log full error response
        errorMessage = error.response.data.message || "Unknown error in response";
    } else if (error.request) {
        // If the error doesn't have a response, it could be network-related
        console.log("Error Request Data:", error.request);
        errorMessage = "No response received from server. Please check your network connection.";
    } else {
        // Any other errors, such as Axios config issues
        console.log("Error Message:", error.message);
        errorMessage = error.message;
    }

    // Return the error message to the client
    return res.status(500).json({
        status: false,
        message: errorMessage
    });
});
        }
             
    });
        } catch (error) {
            console.error("Error placing order:", error); // Log the error
            return res.status(500).json({ 
                status: false, 
                message: error.response ? error.response.data : "An error occurred while placing the order" 
            });
        }
    }



    async ExitplaceOrder(req, res) {
        
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
                exchange = "nse_cm";
            } else {
                optiontype = signal.segment === "F" ? "UT" : signal.optiontype;
                exchange = "nse_fo";
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
                 //    option_type: optiontype 
                 });
             } else if (signal.segment === "F") {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                  //   option_type: optiontype 
                 });
             } else {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                  //   option_type: optiontype, 
                     strike: signal.strikeprice 
                 });
             }


             if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: "Stock not found"
                });
            }


                let positionData=0;
                try {
                  const positionData = await CheckPosition(client.apikey, stock.segment,stock.instrument_token);
                } catch (error) {
                  console.error('Error in CheckPosition:', error.message);
                
              }
              let totalValue=0;
                let holdingData=0;
                if(stock.segment=="C") {
                        try {
                            const holdingData = await CheckHolding(client.apikey , stock.segment,stock.instrument_token);
                        } catch (error) {
                            console.error('Error in CheckHolding:', error.message);
                        }
                        totalValue = Math.abs(positionData)+holdingData;
                    }
                    else
                    {
                        totalValue = Math.abs(positionData)
                    }

                    let calltypes;
                    if(signal.calltype === 'BUY')
                    {
                        calltypes = "S";
                    }
                    else {
                        calltypes = "B";
                    }
        
                    if(totalValue>=quantity) { 
                  
                          const pattern = stock.instrument_token;
                          let ts = null; // Initialize `ts` with a default value
           
                          let filePath_token;
           
                          if (signal.segment.toLowerCase() === 'o') {
                              filePath_token = '../../tokenkotakneo/KOTAK_NFO.csv';
                          } else if (signal.segment.toLowerCase() === 'f') {
                              filePath_token = '../../tokenkotakneo/KOTAK_NFO.csv';
                          } else {
                              filePath_token = '../../tokenkotakneo/KOTAK_NSE.csv';
                          }
                          
                          const filePath1 = path.join(__dirname, filePath_token);
                          
                          fs.readFile(filePath1, 'utf8', (err, data) => {
                              if (err) {
                                  console.error(`Error reading file: ${err}`);
                                  return;
                              }
                          
                              const lines = data.split('\n');
                              let matchedLines;
                          
                              if (signal.segment.toLowerCase() === 'o') {
                                  matchedLines = lines.filter(line => 
                                      new RegExp(`.*(${pattern}).*.*(nse_fo).*.*(${input_symbol}).*.*(${optiontype}).*`, 'i').test(line)
                                  );
                              } else if (signal.segment.toLowerCase() === 'f') {
                                  matchedLines = lines.filter(line => 
                                      new RegExp(`.*(${pattern}).*.*(nse_fo).*`, 'i').test(line)
                                  );
                              } else {
                                  matchedLines = lines.filter(line => 
                                      new RegExp(`.*(${pattern}).*.*(nse_cm).*`, 'i').test(line)
                                  );
                              }
                          
                              if (matchedLines.length > 0) {
                               const parts = matchedLines[0].split(','); // Extract parts from the first (and only) matched line
                               ts = parts[5]; // Get the value from the 6th column (index 5)
                        
           
                               var data =  JSON.stringify({
                                   "tk":stock.instrument_token,
                                   "mp":"0",
                                   "pc":producttype,
                                   "dd":"NA",
                                   "dq":"0",
                                   "vd":"DAY",
                                   "ts":ts,
                                   "tt":calltype,
                                   "pr":price,
                                   "tp":"0",
                                   "qt":quantity,
                                   "es":exchange,
                                   "pt":"MKT"
                               });
                               const requestData = `jData=${data}`;
                         
                           let url = `https://gw-napi.kotaksecurities.com/Orders/2.0/quick/order/rule/ms/place?sId=${client.hserverid}`;
           
                           let config = {
                               method: 'post',
                               maxBodyLength: Infinity,
                               url: url,
                               headers: {
                                   'accept': 'application/json',
                                   'Sid': client.kotakneo_sid,
                                   'Auth': client.authtoken,
                                   'neo-fin-key': 'neotradeapi',
                                   'Content-Type': 'application/x-www-form-urlencoded',
                                   'Authorization': 'Bearer ' + client.oneTimeToken
                               },
                               data: requestData
                           };
           
           
                           
           axios(config)
           .then(async (response) => {
               if (response.data.stat === 'Ok') {
                   const order = new Order_Modal({
                       clientid: client._id,
                       signalid: signal._id,
                       orderid: response.data.nOrdNo,
                       borkerid: 3,
                       quantity: quantity,
                   });
           
                   await order.save();
           
                   return res.json({
                       status: true,
                       data: response.data,
                       message: "Order Placed Successfully"
                   });
               } else {
                   // Log response if the status isn't 'Ok'
                   return res.status(500).json({
                       status: false,
                       message: response.data.message || 'Unknown error in response'
                   });
               }
           })
           .catch(async (error) => {
                          return res.status(500).json({
                   status: false,
                   message: error
               });
           });
                   }
                        
               });
            }
        } catch (error) {
            return res.status(500).json({ 
                status: false, 
                message: error.response ? error.response.data : "An error occurred while placing the order" 
            });
        }
    }



    async checkOrder(req, res) {
        
        try {
            const { orderid, clientid } = req.body;

            const order = await Order_Modal.findOne({
                clientid: clientid,  
                orderid: orderid        
            });
    
            if (!order) {
                return res.status(404).json({
                    status: false,
                    message: "Order not found for this client"
                });
            }


            const client = await Clients_Modal.findById(clientid);
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }

if(order.status==1) {

    return res.json({
        status: true,
        response: order.data
    });
}

if(client.tradingstatus == 0)
    {
        return res.status(404).json({
            status: false,
            message: "Client Broker Not Login, Please Login With Broker"
        });
    }


    if (order.borkerid!=3) {
        return res.status(404).json({
            status: false,
            message: "Order not found for this Broker"
        });
    }


const authToken = client.authtoken;
const userId = client.apikey;


const uniorderId = order.orderid;
           
      var data_orderHistory = qs.stringify({
        jData: '{"nOrdNo":"' + uniorderId + '"}',
      });
      let url1 = `https://gw-napi.kotaksecurities.com/Orders/2.0/quick/order/history?sId=${client.hserverid}`;

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url1,
        headers: {
          accept: "application/json",
          Sid: client.kotakneo_sid,
          Auth: client.authtoken,
          "neo-fin-key": "neotradeapi",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + client.oneTimeToken,
        },
        data: data_orderHistory,
      };
    
            const response = await axios(config); // Use await with axios

            order.data = response.data; 
            order.status = 1; 
            await order.save();

            return res.json({
                status: true,
                response: response.data
            });
    
        } catch (error) {
            return res.status(500).json({ 
                status: false,
                message: error.response ? error.response.data : "Error occurred while fetching order details."
            });
        }
    }
        
}

async function CheckPosition(userId, segment, instrument_token) {
    
    const client = await Clients_Modal.findOne({ apikey: userId });
        if (!client) {
        return res.status(404).json({
            status: false,
            message: "Client not found"
        });
    }

    var position_url = `https://gw-napi.kotaksecurities.com/Orders/2.0/quick/user/positions?sId=${client.hserverid}`
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: position_url,
                    headers: {
                        'accept': 'application/json',
                        'Sid': client.kotakneo_sid,
                        'Auth': client.authtoken,
                        'neo-fin-key': 'neotradeapi',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + client.oneTimeToken
                    }

                };

    axios(config)
    .then(async (response) => {


        if (response.data.stat == "Ok") {
            const Exist_entry_order = response.data.data.find(item1 => item1.tok === instrument_token);

            if (Exist_entry_order !== undefined) {
                let possition_qty;
              
                    possition_qty = parseInt(Exist_entry_order.flBuyQty) - parseInt(Exist_entry_order.flSellQty);
               

                if (possition_qty === 0) {
                    return {
                        status: false,
                        qty: 0,
                    };
                 
                } else {
                           return {
                            status: true,
                            qty: possition_qty,
                        };
                }
            } else {

                return {
                    status: false,
                    qty: 0,
                };
            }
        } else {
            return {
                status: false,
                qty: 0,
            };

        }
    })
    .catch(async (error) => {
        return {
            status: false,
            qty: 0,
        };
          
    });

}



async function CheckHolding(userId, segment, instrument_token) {
    const client = await Clients_Modal.findOne({ apikey: userId });
    if (!client) {
    return res.status(404).json({
        status: false,
        message: "Client not found"
    });
}
   
    var holding_url = `https://gw-napi.kotaksecurities.com/Portfolio/1.0/portfolio/v1/holdings?alt=false`
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: holding_url,
        headers: {
            'accept': 'application/json',
            'Sid': client.kotakneo_sid,
            'Auth': client.authtoken,
            'neo-fin-key': 'neotradeapi',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + client.oneTimeToken
        }

    };
   
    try {
        const response = await axios(config);


        if (response.data.message == "SUCCESS") {

            const existEntryOrder = response.data.find(item1 => item1.instrumentToken === instrument_token);
let possition_qty = 0;
            if (existEntryOrder != undefined) {
                if (segment.toUpperCase() == 'C') {
                     possition_qty = parseInt(existEntryOrder.quantity);
                } 
            }
            return {
                status: true,
                qty: possition_qty,
            };
        } else {
            return {
                    status: false,
                    qty: 0,
                };
        }
    } catch (error) {
        console.error('Error fetching position:', error.response ? error.response.data : error.message);
        return {
            status: false,
            qty: 0,
        };
    }

}

module.exports = new Kotakneo();