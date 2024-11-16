const db = require("../Models");
const multer = require('multer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const path = require('path');
const axios = require('axios');
const Papa = require('papaparse');
const fs = require('fs');
var dateTime = require('node-datetime');
const cron = require('node-cron');
const WebSocket = require('ws');
var CryptoJS = require("crypto-js");
const Stock_Modal = db.Stock;
const Clients_Modal = db.Clients;
const Signal_Modal = db.Signal;
const BasicSetting_Modal = db.BasicSetting;
const Notification_Modal = db.Notification;
const Planmanage = db.Planmanage;
const JsonFile = require("../../uploads/json/config.json");

const { sendFCMNotification } = require('./Pushnotification'); 


let ws;
const url = "wss://ws1.aliceblueonline.com/NorenWS/"

cron.schedule('0 7 * * *', async () => {
    await DeleteTokenAliceToken();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

cron.schedule('0 8 * * *', async () => {
    await AddBulkStockCron();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


cron.schedule('0 4 * * *', async () => {
    await TradingStatusOff();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

cron.schedule(`${JsonFile.cashexpiretime} ${JsonFile.cashexpirehours} * * *`, async () => {
    await CheckExpireSignalCash();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Schedule for future option expiry
cron.schedule(`${JsonFile.foexpiretime} ${JsonFile.foexpirehours} * * *`, async () => {
    await CheckExpireSignalFutureOption();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


cron.schedule('0 9 * * *', async () => {
    await PlanExpire();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


async function AddBulkStockCron(req, res) {
    try {
      const config = {
          method: 'get',
          url: 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json',
      };
  
      const response = await axios(config);
      if (response.data.length > 0) {
  
  
          const filteredDataO = response.data.filter(element =>
              (element.instrumenttype === 'OPTIDX' || element.instrumenttype === 'OPTSTK') &&
              element.exch_seg === "NFO" && element.name != ""
          );


        //   const filteredDataOO = filteredDataO.filter(element =>
        //     (element.instrumenttype === 'OPTIDX' || element.instrumenttype === 'OPTSTK') &&
        //     element.exch_seg === "NFO" && element.name == "RELIANCE" &&  element.expiry=='28NOV2024'
            
        // );

// console.log(filteredDataOO);
         
          const filteredDataF = response.data.filter(element =>
              (element.instrumenttype === 'FUTSTK' || element.instrumenttype === 'FUTIDX') &&
              element.exch_seg === "NFO" && element.name != ""
          );
  
          // const filteredDataMF = response.data.filter(element =>
          //     element.instrumenttype === 'FUTCOM' && element.name != ""
          // );
          // const filteredDataMO = response.data.filter(element =>
          //     (element.instrumenttype === 'OPTFUT' || element.instrumenttype === 'OPTCOM') && element.name != ""
          // );
          // const filteredDataCO = response.data.filter(element =>
          //     element.instrumenttype === 'OPTCUR' && element.name != ""
          // );
          // const filteredDataCF = response.data.filter(element =>
          //     element.instrumenttype === 'FUTCUR' && element.name != ""
          // );
          const filteredDataC = response.data.filter(element =>
              (element.symbol.slice(-3) === '-EQ' || element.symbol.slice(-3) === '-BE') && element.name != ""
          );
  
          // const filteredDataBO = response.data.filter(element =>
          //     (element.instrumenttype === 'OPTIDX' || element.instrumenttype === 'OPTSTK') &&
          //     element.exch_seg === "BFO" && element.name != ""
          // );
  
          // const filteredDataBF = response.data.filter(element =>
          //     (element.instrumenttype === 'FUTSTK' || element.instrumenttype === 'FUTIDX') &&
          //     element.exch_seg === "BFO" && element.name != ""
          // );
          // const filteredDataBC = response.data.filter(element =>
          //     element.instrumenttype === "" && element.exch_seg === "BSE" && element.name != ""
          // );
  
          // console.log("filteredDataBC", filteredDataBC.length)
      
          // Segment O -OPTION
          const userDataSegment_O = await createUserDataArray(filteredDataO, "O");
          console.log("O")
          await insertData(userDataSegment_O);
          console.log("O")
          // Segment F - FUTURE
          const userDataSegment_F = await createUserDataArray(filteredDataF, "F");
          await insertData(userDataSegment_F);
          console.log("F")
          // Segment C -CASH
          const userDataSegment_C = await createUserDataArray(filteredDataC, "C");
          await insertData(userDataSegment_C);
          console.log("C")
  
  
          // Segment MF MCX FUTURE
          // const userDataSegment_MF = await createUserDataArray(filteredDataMF, "MF");
          // await insertData(userDataSegment_MF);
          // console.log("MF")
          // // Segment MO  MCX OPTION
          // const userDataSegment_MO = createUserDataArray(filteredDataMO, "MO");
          // await insertData(userDataSegment_MO);
          // console.log("MO")
  
  
  
  
          // Segment CO CURRENCY OPTION
          // const userDataSegment_CO = await createUserDataArray(filteredDataCO, "CO");
          // await insertData(userDataSegment_CO);
          // console.log("CO")
  
          // // Segment CF  CURRENCY FUTURE
          // const userDataSegment_CF = await createUserDataArray(filteredDataCF, "CF");
          // await insertData(userDataSegment_CF);
          // console.log("CF")
  
          // // Segment BF
          // const userDataSegment_BF = await createUserDataArray(filteredDataBF, "BF");
          // await insertData(userDataSegment_BF);
          // console.log("BF")
          // // Segment BO
          // const userDataSegment_BO = await createUserDataArray(filteredDataBO, "BO");
          // await insertData(userDataSegment_BO);
          // console.log("BO")
  
          // // Segment BC
          // const userDataSegment_BC = await createUserDataArray(filteredDataBC, "BC");
          // await insertData(userDataSegment_BC);
          // console.log("BC")
          
  
    
          return res.send({status:true})
      } else {
          return
      }
  } catch (error) {
      console.log("Error TokenSymbolUpdate Try catch", error);
  }
  }
  
const DeleteTokenAliceToken = async (req, res) => {
    const pipeline = [
        {
            $addFields: {
                expiryDate: {
                    $dateFromString: {
                        dateString: {
                            $concat: [
                                { $substr: ["$expiry", 4, 4] }, // Year
                                "-",
                                { $substr: ["$expiry", 2, 2] }, // Month
                                "-",
                                { $substr: ["$expiry", 0, 2] } // Day
                            ]
                        },
                        format: "%Y-%m-%d"
                    }
                }
            }
        },
        {
            $match: {
                expiryDate: { $lt: new Date() }
            }
        },
        {
            $group: {
                _id: null,
                idsToDelete: { $push: "$_id" } // Collecting all matching _id values
            }
        },
        {
            $project: {
                _id: 0,
                idsToDelete: 1
            }
        },
  
    ];
    const result = await Stock_Modal.aggregate(pipeline)
    console.log("result", result)
    if (result.length > 0) {
        const idsToDelete = result.map(item => item._id);
        await Stock_Modal.deleteMany({ _id: { $in: result[0].idsToDelete } });
        console.log(`${result.length} expired tokens deleted.`);
        return res.send({status:true})
    } else {
        console.log('No expired tokens found.');
        return res.status(500).send({ status: false, message: 'Internal server error' });    }
  
  }
  
  function createUserDataArray(data, segment) {
    let count = 0
    return data.map(element => {
        //   count++
        //   console.log("element.symbol",element , "count - ",count)
        // if (!element.name) {
        //     console.log(`Skipping element with empty name: ${element}`);
        //     console.log(`token: ${element.token}`);
        //     return null;
        // }
        const option_type = element.symbol.slice(-2);
        const expiry_s = dateTime.create(element.expiry);
        const expiry = expiry_s.format('dmY');
        const strike_s = parseInt(element.strike);
        const strike = parseInt(strike_s.toString().slice(0, -2));
        const day_start = element.expiry.slice(0, 2);
        const moth_str = element.expiry.slice(2, 5);
        const year_end = element.expiry.slice(-2);
        const Dat = new Date(element.expiry);
        const moth_count = Dat.getMonth() + 1;
  
        const tradesymbol_m_w = `${element.name}${year_end}${moth_count}${day_start}${strike}${option_type}`;
  
        return {
            symbol: element.name,
            expiry: expiry,
            expiry_month_year: expiry.slice(2),
            expiry_date: expiry.slice(0, -6),
            expiry_str: element.expiry,
            strike: strike,
            option_type: option_type,
            segment: segment,  // Default segment
            instrument_token: element.token,
            lotsize: element.lotsize,
            tradesymbol: element.symbol,
            tradesymbol_m_w: tradesymbol_m_w,
            exch_seg: element.exch_seg
        }; 
    });
  }
  async function insertData(dataArray) {
    //console.log("dataArray ",dataArray)
    try {
        const existingTokens = await Stock_Modal.distinct("instrument_token", {});
        const filteredDataArray = dataArray.filter(userData => {
            return !existingTokens.includes(userData.instrument_token);
        });
        await Stock_Modal.insertMany(filteredDataArray);
    } catch (error) {
        console.log("Error in insertData:", error)
    }
  
  }



  async function TradingStatusOff() {
    try {
        // Find active clients
        const result = await Clients_Modal.find({ del: 0, ActiveStatus: 1 });
        
        // Update trading status for each active client
        if (result.length > 0) {
            const updateResult = await Clients_Modal.updateMany(
                { del: 0, ActiveStatus: 1 },
                { $set: { tradingstatus: 0 } }
            );

            console.log(`Updated trading status for ${updateResult.modifiedCount} active clients.`);
        } else {
            console.log('No active clients found to update.');
            
        }


        const existingSetting = await BasicSetting_Modal.findOne({});
        if (!existingSetting) {
          return res.status(404).json({
            status: false,
            message: "Data not found",
          });
        }

        if (existingSetting) {
            existingSetting.brokerloginstatus = 0;
            await existingSetting.save();
        
            console.log(`Updated trading status ....`);
        } 


    } catch (error) {
        console.error('Error updating trading status:', error);
    }
}




async function CheckExpireSignalCash(req, res) {
    try {
        const today = new Date();
        const signals = await Signal_Modal.find({
            del: 0,
            close_status: false,
            segment: "C",
            callduration:"Intraday",
          });



          for (const signal of signals) {
            try {
                // Get the CPrice for each signal's stock symbol
                const cPrice = await returnstockcloseprice(signal.stock);

                // Update the signal with close_status and close_price
                await Signal_Modal.updateOne(
                    { _id: signal._id },
                    { $set: { close_status: true, closeprice: cPrice, closedate: today } }
                );
            } catch (error) {
                console.error(`Failed to update signal for ${signal.stock}:`, error.message);
            }
        }

        res.json({ message: "Process completed successfully." });
      
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing signals." });

    } 
}


async function CheckExpireSignalFutureOption(req, res) {
    try {

        const existingSetting = await BasicSetting_Modal.findOne({});

        if (!existingSetting.brokerloginstatus) {
          return res.status(404).json({
            status: false,
            message: "Broker not Login",
          });
        }



        const today = new Date();
        const formattedToday = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;

        // Fetch signals based on criteria
        const signals = await Signal_Modal.aggregate([
            {
                $match: {
                    del: 0,
                    close_status: false,
                    segment: { $in: ["F", "O"] },
                 $or: [
                    { expirydate: formattedToday },
                    { callduration: "Intraday" }
                ]
                }
            },
            {
                $lookup: {
                    from: "stocks",  // Stock details collection
                    localField: "tradesymbol",
                    foreignField: "tradesymbol",
                    as: "stockDetails"
                }
            },
            {
                $unwind: {
                    path: "$stockDetails",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        // Generate channel string for the socket connection
        const channelStradd = signals
            .map(signal => `NFO|${signal.stockDetails?.instrument_token || ''}`)
            .join('#');

        // Check if we have any valid signals
        if (!channelStradd) {
            return res.status(404).json({ message: "No valid signals found for today." });
        }

        // Socket session setup parameters
        const userid = existingSetting.aliceuserid;
        const userSession1 = existingSetting.authtoken;  // Replace with actual token
        const type = { loginType: "API" };

        try {
            const response = await axios.post(
                `https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createSocketSess`,
                type,
                {
                    headers: {
                        'Authorization': `Bearer ${userid} ${userSession1}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.stat === "Ok") {
                // If session creation is successful, open socket connection
                await openSocketConnection(channelStradd, userid, userSession1);

                return res.json({
                    message: "Socket session and connection established successfully."
                });
            } else {
                return res.status(500).json({
                    error: "Failed to create socket session.",
                    details: response.data
                });
            }
        } catch (sessionError) {
            console.error('Socket session error:', sessionError);
            return res.status(500).json({ error: "Failed to create socket session." });
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "An error occurred while processing signals." });
    }
}


async function openSocketConnection(channelList, userid, userSession1) {

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
  
  };

  ws.onmessage = async function (msg) {
    const response = JSON.parse(msg.data)
    if (response.lp != undefined) {
      const Cprice = response.lp;


      const today = new Date();
      const formattedToday = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;
    
      const stock = await Stock_Modal.findOne({ instrument_token: response.tk });

      await Signal_Modal.updateOne(
        { tradesymbol: stock.tradesymbol,expirydate: formattedToday,close_status: false },
        { $set: { close_status: true, closeprice: Cprice, closedate: today } }
    );


    }
    if (response.s === 'OK') {

      let json = {
      k: channelList,
      t: 't'
      };
      
      await ws.send(JSON.stringify(json))
      }

  };

  ws.onerror = function (error) {
    console.log(`WebSocket error: ${error}`);
  };

  ws.onclose = async function () {
    
  };

}
  
async function returnstockcloseprice(symbol) {
    try {
        if (!symbol) {
            throw new Error("Symbol is required.");
        }

        const csvFilePath = "https://docs.google.com/spreadsheets/d/1wwSMDmZuxrDXJsmxSIELk1O01F0x1-0LEpY03iY1tWU/export?format=csv";
        const { data } = await axios.get(csvFilePath);
        
        // Return a promise that resolves with the CPrice after parsing
        return new Promise((resolve, reject) => {
            Papa.parse(data, {
                header: true,
                complete: (result) => {
                    let sheetData = result.data;

                    // Map symbol names as needed
                    sheetData.forEach(item => {
                        switch (item.SYMBOL) {
                            case "NIFTY_BANK":
                                item.SYMBOL = "BANKNIFTY";
                                break;
                            case "NIFTY_50":
                                item.SYMBOL = "NIFTY";
                                break;
                            case "NIFTY_FIN_SERVICE":
                                item.SYMBOL = "FINNIFTY";
                                break;
                        }
                    });

                    // Find the requested symbol and return its CPrice
                    const stockData = sheetData.find(item => item.SYMBOL === symbol);

                    if (stockData && stockData.CPrice && stockData.CPrice !== "#N/A") {
                        resolve(stockData.CPrice);
                    } else {
                        reject(new Error("CPrice unavailable or symbol not found."));
                    }
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Error in returnstockcloseprice:", error.message);
        throw error;
    }
}


async function PlanExpire(req, res) {
    try {
        // Get the current date at midnight (start of the day)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to start of the day (midnight)
    
        // Calculate the future dates (5, 3, and 1 days later)
        const futureDates = [
            new Date(currentDate),
            new Date(currentDate),
            new Date(currentDate)
        ];
    
        futureDates[0].setDate(currentDate.getDate() + 5); // 5 days later
        futureDates[1].setDate(currentDate.getDate() + 3); // 3 days later
        futureDates[2].setDate(currentDate.getDate() + 1); // 1 day later
    
        // Normalize each date to midnight (00:00:00)
        futureDates.forEach(date => {
            date.setHours(0, 0, 0, 0); // Resetting to midnight for each date
        });
    
      
    
        // Find plans with `enddate` within the range of the future dates (5, 3, or 1 days)
        const plans = await Planmanage.find({
            enddate: { 
                $gte: futureDates[2], // greater than or equal to 1 day from now
                $lt: futureDates[0]  // less than 5 days from now
            }
        });
    
        // Iterate over each expiring plan
        for (const plan of plans) {
            const planEndDate = new Date(plan.enddate);
            planEndDate.setHours(0, 0, 0, 0); // Normalize the plan's end date to midnight
    
            const timeDifference = planEndDate - currentDate;
            const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
         


            if (plan.serviceid == "66d2c3bebf7e6dc53ed07626") {
                serviceName = "Cash";
              
              } else if (plan.serviceid == "66dfeef84a88602fbbca9b79") {
                serviceName = "Option";
              } else {
                serviceName = "Future";
              }
              
            let message;
            const titles = 'Plan Expiry Notification';
    
            if (daysRemaining === 5) {
                message = `Your plan ${serviceName} service will expire in 5 days.`;
            } else if (daysRemaining === 3) {
                message = `Your plan ${serviceName} service will expire in 3 days.`;
            } else if (daysRemaining === 1) {
                message = `Your plan ${serviceName} service will expire tomorrow.`;
            }
    
             if (message) {
                try {
              
                  const client = await Clients_Modal.findById(plan.clientid); // Fetch the client
                  
                  const resultn = new Notification_Modal({
                    clientid: plan.clientid,
                    segmentid:plan._id,
                    type:"plan expire",
                    title: titles,
                    message: message
                });
    
                await resultn.save();
    
                    if (client && client.devicetoken) {
                        const tokens = [client.devicetoken];
                        await sendFCMNotification(title, message,tokens);
                       
                    }
                        
                } catch (error) {
                }
            }
        }
    
        res.status(200).json({ message: "Notifications sent successfully for expiring plans." });
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing signals." });
    }
}


  module.exports = { AddBulkStockCron,DeleteTokenAliceToken,TradingStatusOff,CheckExpireSignalCash,CheckExpireSignalFutureOption,PlanExpire };
