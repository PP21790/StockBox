"use strict"

const { Schema, model } = require('mongoose');

const signalModel = Schema({
    price: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    service: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    calltype: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    stock: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    tag1:{
        type:String,
        required: true,
        trim: true,
        default: null
    },
    tag2:{
        type:String,
        trim: true,
        default: null
    }, 
    tag3:{
        type:String,
        trim: true,
        default: null
    }, 
    stoploss:{
        type:String,
        trim: true,
        default: null
    }, 
    description:{
        type:String,
        trim: true,
        default: null
    },
    closeprice:{
        type:String,
        trim: true,
        default: null
    }, 
    close_status: {
        type: Boolean,
        default: false // assuming true means active and false means inactive
    },
    close_description: {
        type:String,
        trim: true,
        default: null
    },
    add_by: {
        type: String,
        trim: true,
        default: null
    },
    del: {
        type: String,
        enum: ['1', '0'],
        default: 0
    }
  
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const Signal_model = model('Signal', signalModel);



module.exports = Signal_model;
