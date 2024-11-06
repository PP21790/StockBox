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
//const Papa = require('papaparse');
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

 //app.get('/getcurrentprice', async (req, res) => {


//   try {
//     // Get the current date at midnight (start of the day)
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0); // Set to start of the day (midnight)

//     // Calculate the future dates (5, 3, and 1 days later)
//     const futureDates = [
//         new Date(currentDate),
//         new Date(currentDate),
//         new Date(currentDate)
//     ];

//     futureDates[0].setDate(currentDate.getDate() + 5); // 5 days later
//     futureDates[1].setDate(currentDate.getDate() + 3); // 3 days later
//     futureDates[2].setDate(currentDate.getDate() + 1); // 1 day later

//     // Normalize each date to midnight (00:00:00)
//     futureDates.forEach(date => {
//         date.setHours(0, 0, 0, 0); // Resetting to midnight for each date
//     });

  

//     // Find plans with `enddate` within the range of the future dates (5, 3, or 1 days)
//     const plans = await Planmanage.find({
//         enddate: { 
//             $gte: futureDates[2], // greater than or equal to 1 day from now
//             $lt: futureDates[0]  // less than 5 days from now
//         }
//     });

//     // Iterate over each expiring plan
//     for (const plan of plans) {
//         const planEndDate = new Date(plan.enddate);
//         planEndDate.setHours(0, 0, 0, 0); // Normalize the plan's end date to midnight

//         const timeDifference = planEndDate - currentDate;
//         const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
     
//         let message;
//         const title = 'Plan Expiry Notification';

//         if (daysRemaining === 5) {
//             message = 'Your plan will expire in 5 days.';
//         } else if (daysRemaining === 3) {
//             message = 'Your plan will expire in 3 days.';
//         } else if (daysRemaining === 1) {
//             message = 'Your plan will expire tomorrow.';
//         }


//         if (message) {
//             try {
          
//               const client = await Clients_Modal.findById(plan.clientid); // Fetch the client


//               const resultn = new Notification_Modal({
//                 clientid: plan.clientid,
//                 title: title,
//                 message: message
//             });

//             await resultn.save();

//                 if (client && client.devicetoken) {
//                     await sendFCMNotification(title, message, client.devicetoken);

                   
//                     console.log(`Notification sent and logged for client ID ${plan.clientid}`);
//                 } else {
//                     console.log(`No device token found for client ID ${plan.clientid}`);
//                 }


                
//             } catch (error) {
//             }
//         }
//     }

//     res.status(200).json({ message: "Notifications sent successfully for expiring plans." });

// } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: "An error occurred while processing signals." });
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
