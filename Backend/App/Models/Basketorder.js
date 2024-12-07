"use strict"

const { Schema, model } = require('mongoose');

const BasketorderModel = Schema({
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
    uniqueorderid: {
        type: String,
        trim: true,
        default: null
    },
    borkerid: {
        type: String,
        trim: true,
        default: null
    },
    quantity: {
        type: Number,
        trim: true,
        default: 0
    },
    ordertype: {
        type: String,
        trim: true,
        default: null
    },
    lprice: {
        type: Number,
        default: 0
    },
    tprice: {
        type: Number,
        default: 0
    },
    ordertoken: {
        type: String,
        trim: true,
        default: null
    },
    exchange: {
        type: String,
        trim: true,
        default: null
    },
    version: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        enum: [0, 1], // Example statuses
        default: 0
    },
    data: {
        type: Schema.Types.Mixed,  // Changed to Mixed to allow for objects
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
const Basketorder_Model = model('BasketorderModel', BasketorderModel);


module.exports = Basketorder_Model;
