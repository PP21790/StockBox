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


class Kotakneo {

    async GetAccessToken(req, res) {
        try {
            const { id, apikey, apisecret, user_name, pass_word } = req.body;

            const client = await Clients_Modal.findOne({ _id: id }); 
            // Check if the client exists
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }


            if (client.tradingstatus === "1") {
                return res.json({
                    status: true,
                    message: "Broker login successfully",
                });
            }



            const qs = require("qs");
            const apiUrl = "https://napi.kotaksecurities.com/oauth2/token";
            // const dematepassword = Get_User[0].app_id;
            const consumerKey = apikey;
            const consumerSecret = apikey;
            const username = user_name;
            const password = pass_word; //trade Api pass
            const authString = `${consumerKey}:${consumerSecret}`;
            const authHeaderValue = `Basic ${Buffer.from(authString).toString(
              "base64"
            )}`;
            const requestData = {
              grant_type: "password",
              username: username,
              password: password,
            };
  
            if (consumerKey == "" || consumerKey == null) {

                return res.status(404).json({
                    status: false,
                    message: "Please Update Consumer Key in Broker key..."
                });

             
            }
            if (username == "" || username == null) {


                return res.status(404).json({
                    status: false,
                    message: "Please Update User Name in Broker key..."
                });

            
            }
  
            if (consumerSecret == "" || consumerSecret == null) {

                return res.status(404).json({
                    status: false,
                    message: "Please Update Consumer Secret in Broker key..."
                });

            }
            if (password == "" || password == null) {

                return res.status(404).json({
                    status: false,
                    message: "Please Update Trade Api Password in Broker key..."
                });

             
            }
  
            const url = "https://napi.kotaksecurities.com/oauth2/token";
            const data = "grant_type=client_credentials";
            const headers = {
              Authorization: authHeaderValue,
            };
            axios
              .post(url, data, { headers })
              .then((response) => {
                var access_token = response.data.access_token;
                if (response.data.access_token) {
                  var data5 = JSON.stringify({
                    mobileNumber: client.PhoneNo.includes("+91")
                      ? client.PhoneNo
                      : "+91" + client.PhoneNo,
                    password: password,
                  });
  
                  var config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "https://gw-napi.kotaksecurities.com/login/1.0/login/v2/validate",
                    headers: {
                      accept: "*/*",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + access_token,
                    },
                    data: data5,
                  };
  
                  axios(config)
                    .then(function (response) {
                      var stepOneToken = response.data.data.token;
                      var stepOneSID = response.data.data.sid;
                      var stepHsServerId = response.data.data.hsServerId;
                      var decodeAccessToken = jwt.decode(
                        response.data.data.token
                      );
  
                      if (response.data.data.token) {
                        var data1 = JSON.stringify({
                          userId: decodeAccessToken.sub,
                          sendEmail: true,
                          isWhitelisted: true,
                        });
                        var config1 = {
                          method: "post",
                          maxBodyLength: Infinity,
                          url: "https://gw-napi.kotaksecurities.com/login/1.0/login/otp/generate",
                          headers: {
                            accept: "*/*",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + access_token,
                          },
                          data: data1,
                        };
  
                        axios(config1)
                          .then(async function (response) {
                            if (response.status == 201) {
                            
                              const result = await Clients_Modal.findByIdAndUpdate(
                                id, 
                                { 
                                    oneTimeToken: access_token,
                                    kotakneo_sid: stepOneSID,
                                    kotakneo_userd: decodeAccessToken.sub,
                                    hserverid: stepHsServerId,
                                    authtoken: stepOneToken,  
                                    apisecret: apisecret,
                                    apikey: apikey,
                                    usernamekotak: username,
                                    passwordkotak: password,
                                    dlinkstatus: 1,                      
                                    tradingstatus: 1                       
                                }, 
                                { 
                                    new: true, // Return the updated document
                                    useFindAndModify: false // Prevent deprecation warning (optional)
                                }
                            );
            


                            
                            } else {
                              const message = JSON.stringify(response).replace(
                                /["',]/g,
                                ""
                              );

                              return res.status(404).json({
                                status: false,
                                message: message
                            });
                            }
                          })
                          .catch(function (error) {
                            if (error) {
                              if (error.response) {
                                if (error.response.data.error != undefined) {
                                  const message = JSON.stringify(
                                    error.response.data.error[0].message
                                  ).replace(/["',]/g, "");
  
                                
                              return res.status(404).json({
                                status: false,
                                message: message
                            });
                                } else {
                                  const message = JSON.stringify(
                                    error.response.data
                                  ).replace(/["',]/g, "");
                                 
                              return res.status(404).json({
                                status: false,
                                message: message
                            });
                                }
                              }
                            }
                          });
                      } else {
                        const message = JSON.stringify(response.data).replace(
                          /["',]/g,
                          ""
                        );
                     
                        return res.status(404).json({
                            status: false,
                            message: message
                        });
                      }
                    })
                    .catch(function (error) {
                      if (error.response.data.error != undefined) {
                        const message = JSON.stringify(
                          error.response.data.error[0]
                        ).replace(/["',]/g, "");
  
                        
                        return res.status(404).json({
                            status: false,
                            message: message
                        });

                      } else {
                        const message = JSON.stringify(
                          error.response.data
                        ).replace(/["',]/g, "");
                       
                              return res.status(404).json({
                                status: false,
                                message: message
                            });
                      }
                    });
                } else {
                  const message = JSON.stringify(response.data).replace(
                    /["',]/g,
                    ""
                  );
                 
                  return res.status(404).json({
                    status: false,
                    message: message
                });
                }
              })
              .catch((error) => {
                if (error.response != undefined) {
                  const message = JSON.stringify(error.response.data).replace(
                    /["',]/g,
                    ""
                  );
  
                 
                  return res.status(404).json({
                    status: false,
                    message: message
                });
                } else {
                  const message = JSON.stringify(error.response.data).replace(
                    /["',]/g,
                    ""
                  );
                 
                  return res.status(404).json({
                    status: false,
                    message: message
                });
                }
              });

                return res.json({
                    status: true,
                    message: "Broker login successfully",
                });
           
          
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

          //  const response = await axios(config);

            axios(config)
            .then(async (response) => {
              
                if (response.data.message == 'SUCCESS') {



                    const order = new Order_Modal({
                        clientid: client._id,
                        signalid:signal._id,
                        orderid:response.data.data.orderid,
                        uniqueorderid:response.data.data.uniqueorderid,
                        borkerid:1,
                        quantity:quantity,
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
    
            })
            .catch(async (error) => {
                return res.status(500).json({ 
                    status: false, 
                    message: response.data.message 
                });
    
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
                  const positionData = await CheckPosition(client.apikey, authToken, stock.segment,stock.instrument_token,producttype,signal.calltype,stock.tradesymbol);
                } catch (error) {
                  console.error('Error in CheckPosition:', error.message);
                
              }
              let totalValue=0;
                let holdingData=0;
                if(stock.segment=="C") {
                        try {
                            const holdingData = await CheckHolding(client.apikey, authToken , stock.segment,stock.instrument_token,producttype,signal.calltype);
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
                        calltypes = "SELL";
                    }
                    else {
                        calltypes = "BUY";
                    }
        
                    if(totalValue>=quantity) { 
                    var data = JSON.stringify({
                        "variety":"NORMAL",
                        "tradingsymbol":stock.tradesymbol,
                        "symboltoken":stock.instrument_token,
                        "transactiontype":calltypes,
                        "exchange":exchange,
                        "ordertype":"MARKET",
                        "producttype":producttype,
                        "duration":"DAY",
                        "price":price,
                        "squareoff":"0",
                        "stoploss":"0",
                        "quantity":quantity
                        });


           const config = {
                method: 'post',
                url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/placeOrder',
              
                headers: { 
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                    'X-UserType': 'USER', 
                    'X-SourceID': 'WEB', 
                    'X-ClientLocalIP': 'CLIENT_LOCAL_IP', 
                    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP', 
                    'X-MACAddress': 'MAC_ADDRESS',
                    'X-PrivateKey': client.apikey 
                },
                data: data
            };

            axios(config)
            .then(async (response) => {
              
                if (response.data.message == 'SUCCESS') {


                    const order = new Order_Modal({
                        clientid: client._id,
                        signalid:signal._id,
                        orderid:response.data.data.orderid,
                        uniqueorderid:response.data.data.uniqueorderid,
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
    
            })
            .catch(async (error) => {
                return res.status(500).json({ 
                    status: false, 
                    message: response.data.message 
                });
    
            });
        
        }
        else{

            return res.status(500).json({ 
                status: false, 
                message: "Sorry, the requested quantity is not available." 
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


    if (order.borkerid!=1) {
        return res.status(404).json({
            status: false,
            message: "Order not found for this Broker"
        });
    }


const authToken = client.authtoken;
const userId = client.apikey;


const uniorderId = order.uniqueorderid;
            const config = {
                method: 'get',
                url: `https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/details/${uniorderId}`, // Use dynamic orderid
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-UserType': 'USER',
                    'X-SourceID': 'WEB',
                    'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                    'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                    'X-MACAddress': 'MAC_ADDRESS',
                    'X-PrivateKey': userId
                },
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




async function CheckPosition(userId, authToken, segment, instrument_token, producttype, calltype, trading_symbol) {
    

    var config = {
        method: 'get',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/getPosition',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserType': 'USER',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
            'X-MACAddress': 'MAC_ADDRESS',
            'X-PrivateKey': userId
        },
    };

    axios(config)
    .then(async (response) => {


        if (response.data.data != null && response.data.message == "SUCCESS") {
            const Exist_entry_order = response.data.data.find(item1 => item1.symboltoken === instrument_token);

            if (Exist_entry_order !== undefined) {
                let possition_qty;
                if (segment.toUpperCase() === 'C') {
                    possition_qty = parseInt(Exist_entry_order.buyqty) - parseInt(Exist_entry_order.sellqty);
                } else {
                    possition_qty = Exist_entry_order.netqty;
                }

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



async function CheckHolding(userId, authToken, segment, instrument_token, producttype, calltype) {
   
   
     var config = {
                    method: 'get',
                    url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/portfolio/v1/getAllHolding',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-UserType': 'USER',
                        'X-SourceID': 'WEB',
                        'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
                        'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
                        'X-MACAddress': 'MAC_ADDRESS',
                        'X-PrivateKey': userId
                    },
                };
   
    try {
        const response = await axios(config);


        if (response.data.message == "SUCCESS") {

            const existEntryOrder = response.data.data.holdings.find(item1 => item1.symboltoken === instrument_token && item1.product === producttype);
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