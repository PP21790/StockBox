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
const Order_Modal = db.Order;
const BasicSetting_Modal = db.BasicSetting;

class Markethub {


async GetAccessToken(req, res) {
  try {
    const { id, apikey, apisecret, pass_word } = req.body;

    // Validate inputs
    if (!id || !apikey || !apisecret || !pass_word) {
      return res.status(400).json({
        status: false,
        message: "All fields (id, client id, verification code, password) are required",
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

    // Prepare login data dynamically
    const data = JSON.stringify({
      LoginID: apikey,
      Password: pass_word,
      Dob: "", // Add if required
      Pan: "", // Add if required
      imei: "1234567890",
      LoginDevice: "Android",
      ApkVersion: "1.0.2",
      Source: "MOB",
      DevId: "1234",
      factortwo: apisecret, // Assuming this is your verification code
    });

    // Axios config
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fund.markethubonline.com/middleware/api/v2/Login',
      headers: {
        'AppKey': 'Xbk03o13AnxII=UMXz06+nrN',
        'IsEncrypted': 'False',
        'Content-Type': 'application/json',
      },
      data,
    };

    // Make API request
    const response = await axios.request(config);
    console.log("response",response);
    if (response.data.data.jwtToken) {
      const AccessToken = response.data.data.jwtToken;

      await Clients_Modal.findByIdAndUpdate(
        id,
        {
          authtoken: AccessToken,
          oneTimeToken: pass_word,
          apisecret,
          apikey,
          dlinkstatus: 1,
          tradingstatus: 1,
          brokerid: 4,
        },
        { new: true }
      );

      return res.json({ status: true, message: "Broker login successfully" });
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials. Please check your broker key.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);

    // Handle Axios errors or other errors
    if (error.response) {
      return res.status(500).json({
        status: false,
        message: error.response.data?.message || "External API error",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Server error. Please try again later.",
    });
  }
}

async placeOrder(req, res) {
  try {
    const { id, signalid, quantity, price } = req.body;
  
    // Validate client existence
    const client = await Clients_Modal.findById(id);
    if (!client) {
      return res.status(404).json({ status: false, message: "Client not found" });
    }
  
    // Validate trading status
    if (client.tradingstatus == 0) {
      return res.status(400).json({
        status: false,
        message: "Client Broker Not Login, Please Login With Broker",
      });
    }
  
    // Validate signal existence
    const signal = await Signal_Modal.findById(signalid);
    if (!signal) {
      return res.status(404).json({ status: false, message: "Signal not found" });
    }
  
    // Determine option type, exchange, and product type
    const { segment, callduration, expirydate, stock: signalStock, optiontype: signalOptionType, strikeprice } = signal;
    let optiontype = segment === "C" ? "EQ" : segment === "F" ? "UT" : signalOptionType;
    let exchange = segment === "C" ? "NSE" : "NFO";
    let producttype = callduration === "Intraday" ? "MIS" : segment === "C" ? "CNC" : "NRML";
  
    // Query stock details
    const stockQuery = { symbol: signalStock, segment };
    if (segment !== "C") {
      stockQuery.expiry = expirydate;
      if (segment !== "F") {
        stockQuery.strike = strikeprice;
      }
    }
    const stock = await Stock_Modal.findOne(stockQuery);
  
    if (!stock) {
      return res.status(404).json({ status: false, message: "Stock not found" });
    }
  
    const data = JSON.stringify({
      variety: "NORMAL",
      tradingsymbol: stock.tradesymbol,
      symboltoken: stock.instrument_token,
      transactiontype: signal.calltype,
      exchange,
      ordertype: "MARKET",
      producttype,
      duration: "DAY",
      price,
      quantity,
      triggerprice: "0",
      disclosedquantity: "0",
      ordersource: null,
      naicCode: null,
      remarks: "_",
      Confirm: true,
      AlgoId: "0",
      AlgoType: "0",
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fund.markethubonline.com/middleware/api/v2/PlaceOrder',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${client.authtoken}`
      },
      data: data
    };
  
    
   
      // Make the request
      const response = await axios.request(config);
      if (response.data.user_order_number != undefined) {
        // Save order in the database
        const order = new Order_Modal({
          clientid: client._id,
          signalid: signal._id,
          orderid: response.data.user_order_number,
          ordertype: signal.calltype,
          brokerid: 4,
          quantity,
        });
  
        await order.save();
        
        return res.json({ status: true, message: 'Order placed successfully', data: response.data });
      } else {
        return res.status(400).json({ status: false, message: "Order placement failed", data: response.data });
      }
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
                   //  option_type: optiontype 
                 });
             } else if (signal.segment === "F") {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                 //    option_type: optiontype 
                 });
             } else {
                 stock = await Stock_Modal.findOne({ 
                     symbol: signal.stock, 
                     segment: signal.segment, 
                     expiry: signal.expirydate, 
                    // option_type: optiontype, 
                     strike: signal.strikeprice 
                 });
             }


             if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: "Stock not found"
                });
            }


          

            let holdingData = { qty: 0 };  
            let positionData = { qty: 0 };  
            let totalValue = 0;  // Declare totalValue outside the blocks
                try {
                   positionData = await CheckPosition(client.apikey, authToken, stock.segment,stock.instrument_token,producttype,signal.calltype,stock.tradesymbol);
                
                  } catch (error) {
                  console.error('Error in CheckPosition:', error.message);
                
              }

           
                if(stock.segment=="C") {
                        try {
                             holdingData = await CheckHolding(client.apikey, authToken , stock.segment,stock.instrument_token,producttype,signal.calltype);
                           
                        } catch (error) {
                            console.error('Error in CheckHolding:', error.message);
                        }
                        totalValue = Math.abs(positionData.qty)+holdingData.qty;
                    }
                    else
                    {
                        totalValue = Math.abs(positionData.qty)
                    }
             
                
            let calltypes;
                if(signal.calltype === 'BUY')
                {
                    calltypes = "SELL";
                }
                else {
                    calltypes = "BUY";
                }
          
                console.log('bbbb');

         if(totalValue>=quantity) {

            const data = JSON.stringify({
                variety: "NORMAL",
                tradingsymbol: stock.tradesymbol,
                symboltoken: stock.instrument_token,
                transactiontype: calltypes,
                exchange,
                ordertype: "MARKET",
                producttype,
                duration: "DAY",
                price,
                quantity,
                triggerprice: "0",
                disclosedquantity: "0",
                ordersource: null,
                naicCode: null,
                remarks: "_",
                Confirm: true,
                AlgoId: "0",
                AlgoType: "0",
              });
          
              // Axios request configuration
              const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://fund.markethubonline.com/middleware/api/v2/PlaceOrder",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${client.authtoken}`

                },
                data,
              };
          
              // Send order request
              const response = await axios.request(config);
          console.log("response",response);
              const responseData = response.data;
              if (response.data.user_order_number != undefined) {
    
                    const order = new Order_Modal({
                        clientid: client._id,
                        signalid:signal._id,
                        orderid:response.data.user_order_number,
                        ordertype: calltypes,
                        borkerid:4,
                        quantity
                    });
    
    
                   await order.save();
                    return res.json({
                        status: true,
                        data: response.data 
                    });
                }
                else{
                   
                       return res.status(500).json({ 
                        status: false, 
                        message: response.data 
                    });
                }
        
            }
            else{

                return res.status(500).json({ 
                    status: false, 
                    message: "Sorry, the requested quantity is not available." 
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


    if (order.borkerid!=2) {
        return res.status(404).json({
            status: false,
            message: "Order not found for this Broker"
        });
    }


const authToken = client.authtoken;
const userId = client.apikey;




let data = JSON.stringify({
    "orderId": orderid
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://fund.markethubonline.com/middleware/api/v2/OrderHistory',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${authToken}`

    },
    data : data
  };
  
     const response = await axios(config); 

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
    


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fund.markethubonline.com/middleware/api/v2/GetNetPositions',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
    };
    const response = await axios(config);

            if (Array.isArray(response.data)) {

                const Exist_entry_order = response.data.find(item1 => item1.scrip_token === instrument_token && item1.product_type == producttype);

                if(Exist_entry_order != undefined){
                    if (segment.toUpperCase() == 'C') {

                        const possition_qty = parseInt(Exist_entry_order.buy_quantity) - parseInt(Exist_entry_order.sell_quantity);
                     
                        if (possition_qty == 0) {
                          return {
                            status: false,
                            qty: 0,
                        };

                        } else {

                          return {
                            status: false,
                            qty: 0,
                        };                        
                        }

                    } else {
                        const possition_qty = Exist_entry_order.net_quantity;                         
                        if (possition_qty == 0) {
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

                    }
                }else{
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
      

}

async function CheckHolding(userId, authToken, segment, instrument_token, producttype, calltype) {
   
   
   
    let data = JSON.stringify({
        "producttype": "MTF"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fund.markethubonline.com/middleware/api/v2/GetHoldings',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${authToken}`
        },
        data : data
      };

    try {
        const response = await axios(config);
        if (response.data.message == "Ok") {

            const existEntryOrder = response.data.data.find(item1 => item1.symboltoken === instrument_token && item1.product === producttype);

            let possition_qty = 0;
            if (existEntryOrder != undefined) {
                if (segment.toUpperCase() == 'C') {
                     possition_qty = parseInt(existEntryOrder.authorisedquantity);
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


module.exports = new Markethub();