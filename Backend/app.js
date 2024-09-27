"use strict";

require('dotenv').config();
const mongoConnection = require("./App/Connection/Connection");
const express = require("express");
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require("./App/Models");
require('./App/Controllers/Cron.js'); // Adjust the path based on your file structure
const Clients_Modal = db.Clients;
const BasicSetting_Modal = db.BasicSetting;
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

// Importing routes
require('./App/Routes/index')(app)
require('./App/api/Routes/index')(app)
//require('./App/api/Routes/index')(app)

// httpsserver.listen(1001)
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`);
});
