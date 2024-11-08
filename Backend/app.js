"use strict";


require('dotenv').config();
const mongoConnection = require("./App/Connection/Connection");
const express = require("express");
const app = express();
var axios = require('axios');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
// const Papa = require('papaparse');
const WebSocket = require('ws');
var CryptoJS = require("crypto-js");
const bodyparser = require('body-parser');
const db = require("./App/Models");
//const { AddBulkStockCron } = require('./App/Controllers/Cron.js'); 
process.env.TZ = 'Asia/Kolkata'; // Set the global time zone to IST
console.log('Current time in IST:', new Date());
const { sendFCMNotification } = require('./App/Controllers/Pushnotification'); // Adjust if necessary

require('./App/Controllers/Cron.js'); 
const Clients_Modal = db.Clients;
const BasicSetting_Modal = db.BasicSetting;
const Activitylogs_Modal = db.Activitylogs;
const Blogs_Modal = db.Blogs;
const News_Modal = db.News;
const Coupon_Modal = db.Coupon;
const Role_Modal = db.Role;
const Service_Modal = db.Service;
const Users_Modal = db.Users;
const Faq_Modal = db.Faq;
const Plan_Modal = db.Plan;
const Stock_Modal = db.Stock;
const Basket_Modal = db.Basket;
const Script_Modal = db.Script;
const Signal_Modal = db.Signal;
const Banner_Modal = db.Banner;
const Plancategory_Modal = db.Plancategory;
const PlanSubscription_Modal = db.PlanSubscription;
const Content_Modal = db.Content;
const BasketSubscription_Modal = db.BasketSubscription;
const Mailtemplate_Modal = db.Mailtemplate;
const Refer_Modal = db.Refer;
const Planmanage = db.Planmanage;
const Payout_Modal = db.Payout;
const Order_Modal = db.Order;
const Freetrial_Modal = db.Freetrial;
const Helpdesk_Modal = db.Helpdesk;
const Broadcast_Modal = db.Broadcast;
const License_Modal = db.License;
const Notification_Modal = db.Notification;



const corsOpts = {
  origin: '*', // Adjust this as needed for your security requirements
  methods: ['GET', 'POST'],
  allowedHeaders: [
    "x-access-token", "Origin", "Content-Type", "Accept", "authorization",
  ],
};

app.use(cors());

// Body-parser middleware setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb', extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const server = http.createServer(app);

let ws;
const url = "wss://ws1.aliceblueonline.com/NorenWS/"

 //app.get('/getcurrentprice', async (req, res) => {

  // const today = new Date();
  // const formattedToday = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;


  // const signals = await Signal_Modal.aggregate([
  //   {
  //     $match: {
  //       del: 0,
  //       close_status: false,
  //       segment: { $in: ["F", "O"] },
  //       expirydate: formattedToday
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: "stocks",       // Collection name for stock details
  //       localField: "tradesymbol",   // Field in Signal_Modal to match
  //       foreignField: "tradesymbol", // Field in StockDetails_Modal to match
  //       as: "stockDetails"           // Resulting array field for matched details
  //     }
  //   },
  //   {
  //     $unwind: {
  //       path: "$stockDetails",
  //       preserveNullAndEmptyArrays: true // Keeps signals without a matching stock detail
  //     }
  //   }
  // ]);

  // const channelStradd = signals
  // .map(signal => `NFO|${signal.stockDetails.instrument_token}`)
  // .join('#');// Concatenates all items into a single string



  // var userid = "506932";
  // var userSession1 = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyam9lOFVScGxZU3FTcDB3RDNVemVBQkgxYkpmOE4wSDRDMGVVSWhXUVAwIn0.eyJleHAiOjE3MzYwNzg0NDEsImlhdCI6MTczMDg5NDcxNywianRpIjoiNGYzOTNjYzctOGFjNi00MDNlLTkyMTktZTkzY2RiODM2NzhkIiwiaXNzIjoiaHR0cHM6Ly9pZGFhcy5hbGljZWJsdWVvbmxpbmUuY29tL2lkYWFzL3JlYWxtcy9BbGljZUJsdWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjMwMTdkODYtOWJiZi00NWYwLTk0ZTEtMmYzZDMxN2EwYTNlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWxpY2Uta2IiLCJzaWQiOiJkNzgwMTBmMS0xYzU3LTQ2OGQtOTc2OC1lMDE0MGQyYmJjN2UiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAyIiwiaHR0cDovL2xvY2FsaG9zdDo1MDUwIiwiaHR0cDovL2xvY2FsaG9zdDo5OTQzIiwiaHR0cDovL2xvY2FsaG9zdDo5MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYWxpY2VibHVla2IiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFsaWNlLWtiIjp7InJvbGVzIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIG9wZW5pZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1Y2MiOiI1MDY5MzIiLCJjbGllbnRSb2xlIjpbIkdVRVNUX1VTRVIiLCJBQ1RJVkVfVVNFUiJdLCJuYW1lIjoiUEFOS0FKIFBBVElEQVIiLCJtb2JpbGUiOiI3ODc5ODE1NjY5IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiNTA2OTMyIiwiZ2l2ZW5fbmFtZSI6IlBBTktBSiIsImZhbWlseV9uYW1lIjoiUEFUSURBUiIsImVtYWlsIjoicGFua2FqcGF0aWRhcjMzM0BnbWFpbC5jb20ifQ.Jxq9wTQZRbmiKEV5uGBVrX0HCgtrRCDv70r0Fj2q2t-J4shBskXhag2sOFvjkhJQscmQo6jt02QjutwOJENTnz84TfVWQku3QRCDQoLzr4iHdHk7k0M5T7PCiKNvhK4q4leCrLNpwSe_gDlGcRN3PYadtgSE0OFd4c_jA491mpBMoXy4yaYQbzNxwezty3AKSVyQxQwS3_waQ7Md5VYyOf30NEQyADJz5SQt2GVQTr8barovgXA1tIE1JA3jO4B_zJKT1dFaRUG5b3FXIIvaSMIKVytMvdjh6EG6lUix4tHCkoEsQE5w6i37QC6WVNGf4DjiS8hmvsqC7ZMQok5Nxw";
  // var trading_status = 1;
  // var type = { "loginType": "API" }

  // try {


  //   await axios.post(`https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/ws/createSocketSess`, type, {
  //     headers: {
  //       'Authorization': `Bearer ${userid} ${userSession1}`,
  //       'Content-Type': 'application/json'
  //     },

  //   }).then(ress => {
  //     if (ress.data.stat == "Ok") {

  //       openSocketConnection(channelStradd, userid, userSession1)

  //       return res.json({
  //         message: "ok",
  //     });

  //     }
  //   }).catch((error) => {
  //   })


  // } catch (error) {
  // }

// });





// Importing routes
require('./App/Routes/index')(app)
require('./App/api/Routes/index')(app)
//require('./App/api/Routes/index')(app)



// httpsserver.listen(1001)
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
