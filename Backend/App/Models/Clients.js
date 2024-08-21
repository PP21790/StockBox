"use strict"

const { Schema, model } = require('mongoose');

const clientsModel = Schema({
    FullName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: null
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 10,
        unique: true,
        default: null
    },
    password:{
        type:String,
        required: true,
        trim: true,
        default: null
    },
    token: {
        type: String,
        trim: true,
        unique: true,
        default: null
    },
    del: {
        type: String,
        enum: ['1', '0'],
        default: 0
    },
    ActiveStatus: {
        type: String,
        enum: ['1', '0'],
        default: '0'
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
const Clients_model = model('CLIENTS', clientsModel);



module.exports = Clients_model;
