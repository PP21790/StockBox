var axios = require('axios');
const db = require("../Models");
const BasicSetting_Modal = db.BasicSetting;
const Order_Modal = db.Order;
const Liveprice_Modal = db.Liveprice;
const Basketstock_Modal = db.Basketstock;

const WebSocket = require('ws');
var CryptoJS = require("crypto-js");
const { ObjectId } = require('mongoose').Types;
let ws;
const url = "wss://ws1.aliceblueonline.com/NorenWS/"

const Alice_Socket = async () => {


    // const orders = await Order_Modal.aggregate([
    //     {
    //         $match: {
    //             tsstatus: { $in: ["1"] }, // Target or Stop-loss
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: { ordertoken: "$ordertoken", exchange: "$exchange" }, // Group by ordertoken and exchange
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0, // Exclude the _id field
    //             ordertoken: "$_id.ordertoken", // Include ordertoken
    //             exc: "$_id.exchange" // Include exchange
    //         }
    //     }
    // ]);
    


    const groupedStocks = await Basketstock_Modal.aggregate([
      // Join with the Stock_Modal collection based on the tradesymbol field
      {
          $lookup: {
              from: "stocks", // The name of the Stock_Modal collection (ensure the correct name)
              localField: "tradesymbol", // Field in Basketstock_Modal to match with Stock_Modal
              foreignField: "tradesymbol", // Field in Stock_Modal to match with Basketstock_Modal
              as: "stock_info" // Alias for the matched data from the Stock_Modal collection
          }
      },
      // Unwind the stock_info array to flatten the result, so we can access instrument_token directly
      {
          $unwind: {
              path: "$stock_info", // Unwind the stock_info array
              preserveNullAndEmptyArrays: true // Preserve empty arrays in case there is no match
          }
      },
      // Group by tradesymbol
      {
          $group: {
              _id: "$tradesymbol", // Group by tradesymbol
              instrument_token: { $first: "$stock_info.instrument_token" } // Get the instrument_token from the stock_info
          }
      },
      // Project the final result to include only tradesymbol and instrument_token, and set "exc" to "NSE"
      {
          $project: {
              _id: 0, // Exclude the _id field
              exc: "NSE", // Set the constant value of "NSE" for the exchange
              ordertoken: "$instrument_token", // Map the instrument_token to ordertoken
          }
      }
  ]);
  
  
  const orders = await Order_Modal.aggregate([
      {
          $match: {
              tsstatus: { $in: ["1"] }, // Target or Stop-loss
          }
      },
      {
          $group: {
              _id: { ordertoken: "$ordertoken", exchange: "$exchange" }, // Group by ordertoken and exchange
          }
      },
      {
          $project: {
              _id: 0, // Exclude the _id field
              ordertoken: "$_id.ordertoken", // Include ordertoken
              exc: "$_id.exchange" // Include exchange
          }
      }
  ]);
  
      // Log the result or return it
      const groupedStocksWithStringToken = groupedStocks.map(stock => ({
        ...stock,
        ordertoken: String(stock.ordertoken) // Ensure ordertoken is a string
      }));
      
      const ordersWithStringToken = orders.map(order => ({
        ...order,
        ordertoken: String(order.ordertoken) // Ensure ordertoken is a string
      }));
      
      // Merge both arrays
      const mergedStocks = [
        ...groupedStocksWithStringToken,
        ...ordersWithStringToken
      ];
      
      // Deduplicate the merged array based on ordertoken
      const uniqueStocks = mergedStocks.filter((value, index, self) =>
        index === self.findIndex((stock) => (
          stock.ordertoken === value.ordertoken // Compare ordertoken as a string
        ))
      );
      

      

    let channelstradd = "";
    const uniqueTokens = new Set();


  
  if (uniqueStocks.length > 0) {
   
    const resultString = uniqueStocks.reduce((acc, { ordertoken, exc }) => {
      if (!uniqueTokens.has(ordertoken)) {
        uniqueTokens.add(ordertoken); 
        acc += `${exc}|${ordertoken}#`; 
      }
      return acc;
    }, '');
    channelstradd += resultString;
    // channelstradd += resultString.slice(0, -1);
  }
 

  var alltokenchannellist = channelstradd.substring(0, channelstradd.length - 1);

  const alice = await BasicSetting_Modal.findOne();  
  
  if (!alice.aliceuserid) {
    
    console.log('alice',alice);
    return
}
  const userid = alice.aliceuserid;
  const userSession1 = alice.authtoken;
  const brokerloginstatus = alice.brokerloginstatus;

  var aliceBaseUrl = "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/"
  var channelList = alltokenchannellist
  var type = { "loginType": "API" }
  
  
  if (userid !== undefined && userSession1 !== undefined && brokerloginstatus==1)  {

    try {

      await axios.post(`${aliceBaseUrl}ws/createSocketSess`, type, {
        headers: {
          'Authorization': `Bearer ${userid} ${userSession1}`,
          'Content-Type': 'application/json'
        },

      }).then(res => {


        if (res.data.stat == "Ok") {
          openSocketConnection(channelList, userid, userSession1)
        }
      }).catch((error) => {
        return "error"
      })


    } catch (error) {
      console.log("Error createSocketSess", error);
    }

  } else {
    console.log("Alice Socket Not Connected")
  }


}
  function openSocketConnection(channelList, userid, userSession1) {

    ws = new WebSocket(url);
    ws.onopen = function () {
      var encrcptToken = CryptoJS.SHA256(CryptoJS.SHA256(userSession1).toString()).toString();
      var initCon = {
        susertoken: encrcptToken,
        t: "c",
        actid: userid + "_" + "API",
        uid: userid + "_" + "API",
        source: "API"
      }
      
      ws.send(JSON.stringify(initCon))
      sendChannelList(channelList);
      // reconnectAttempt = 0; // Reset reconnect attempts on successful connection
    };
  
    ws.onmessage = async function (msg) {
      const response = JSON.parse(msg.data)
     
      if (response.tk) {
        if (response.lp != undefined) {
            await Liveprice_Modal.updateOne(
              { token: response.tk }, // Match by _id (response.tk contains the _id of the document)
                {
                  $set: {
                    token: response.tk, 
                    lp: response.lp,     // Update live price
                    exc: response.e,     // Update exchange
                    curtime: `${new Date().getHours().toString().padStart(2, '0')}${new Date().getMinutes().toString().padStart(2, '0')}`, // Update current time
                    ft: response.ft      // Update ft (if needed)
                  }
                },
                { upsert: true } // Insert the document if it doesn't exist
              );
  
        }

      }
  
  
    };
  
    ws.onerror = function (error) {
      console.log(`WebSocket error: ${error}`);
    };
  
    ws.onclose = async function () {
      await socketRestart()
    };
  
  }


  // Function to send the current channel list
function sendChannelList(channelList) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const json = {
        k: channelList,
        t: 't'
      };
      ws.send(JSON.stringify(json));  // Send channel list to server
      console.log("Channel list sent:", channelList);
    } else {
      console.log("WebSocket is not open. Cannot send channel list.");
    }
  }


  
// Function to dynamically update the channelList and send it
function updateChannelAndSend(newChannel) {

    sendChannelList(newChannel);  // Send updated channel list
  }
  
  
  const socketRestart = async () => {
  
    await Alice_Socket()
  };
  
  

  







module.exports = { Alice_Socket,updateChannelAndSend }
