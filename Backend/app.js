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
const Bank_Modal = db.Bank;
const Adminnotification_Modal = db.Adminnotification;


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

//  app.get('/getcurrentprice', async (req, res) => {
//   try {
//     // SMTP configuration directly in function
//     const transporter = nodemailer.createTransport({
//         host: "smtp.hostinger.com",
//         port: 465,
//         secure: 'true', // true for SSL, false for TLS/STARTTLS
//         auth: {
//             user: "service@equimate.in",
//             pass: "Service@311023"
//         }
//     });

//     // Prepare dynamic content
  

//     // Define email options
//     const mailOptions = {
//         to: 'pankajpatidar333@gmail.com',
//         from: `service@equimate.in`,
//         subject: "forgot",
//         html: "finalHtml"
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");

// } catch (error) {
//     console.error("Error sending email:", error);
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
