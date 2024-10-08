"use strict"

const { Schema, model } = require('mongoose');

const OrderModel = Schema({
    clientid: {
        type: String,
        trim: true,
        default: null
    },
    signalid: {
        type: String,
        trim: true,
        default: null
    },
    orderid: {
        type: String,
        trim: true,
        default: null
    },
    borkerid: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: [0, 1], // Example statuses
        default: 0
    },
    data: {
        type: String,
        trim: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
    
},
    {
        timestamps: true
    },

)
const Order_Model = model('OrderModel', OrderModel);



module.exports = Order_Model;
