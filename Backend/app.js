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
const nodemailer = require('nodemailer');
const socketIo = require("socket.io");
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// console.log("io ",io)
require("./App/Utils/ioSocketReturn")(app, io);
const { sendFCMNotification } = require('./App/Controllers/Pushnotification'); // Adjust if necessary

require('./App/Controllers/Cron.js');
require('./App/Utils/Settimeout.js');

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
const Bank_Modal = db.Bank;
const Adminnotification_Modal = db.Adminnotification;
const Basketstock_Modal = db.Basketstock;
const Liveprice_Modal = db.Liveprice;
const Basketorder_Modal = db.Basketorder;

const { Alice_Socket } = require("./App/Utils/AliceSocket");


const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept", "authorization",
  ],
};

app.options("*", cors())


app.use(cors(corsOpts));

// Body-parser middleware setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb', extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

let ws;
const url = "wss://ws1.aliceblueonline.com/NorenWS/"
app.get("/test", async (req, res) => {
  try {
    const groupedSignals = await Signal_Modal.aggregate([
      {
        $lookup: {
          from: "stocks", // Stocks collection ka naam
          localField: "tradesymbol", // Signal modal ka field
          foreignField: "tradesymbol", // Stocks modal ka field
          as: "stock_info", // Jo data join hoke aayega
        },
      },
      {
        $unwind: {
          path: "$stock_info", // Stock info array ko unwind karna
          preserveNullAndEmptyArrays: true, // Agar matching na ho toh null ko preserve kare
        },
      },
      {
        $group: {
          _id: "$tradesymbol", // Grouping key
          instrument_token: { $first: "$stock_info.instrument_token" }, // Pehla instrument_token le lo
        },
      },
      {
        $project: {
          _id: 0, // _id ko exclude karna
          exc: "NSE", // Static exchange value
          ordertoken: "$instrument_token", // Result mein instrument_token ko ordertoken ke naam se dikhana
        },
      },
    ]);

    console.log("groupedSignals", groupedSignals);

    // Response send karein
    res.status(200).json({
      success: true,
      data: groupedSignals,
    });
  } catch (error) {
    console.error("Error fetching groupedSignals:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

    //Alice_Socket();
});




require('./App/Routes/index')(app)
require('./App/api/Routes/index')(app)

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

