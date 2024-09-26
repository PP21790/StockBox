"use strict";

const { Schema, model } = require('mongoose');

const StockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    expiry_month_year: {
        type: String,
        required: true,
    },
    expiry_date: {
        type: String,
        required: true,
    },
    expiry_str: {
        type: String,
        required: true,
    },
    strike: {
        type: String,
        required: true,
    },
    option_type: {
        type: String,
        enum: ['CE', 'PE'], // Assuming these are the only valid values for option_type
        required: true,
    },
    segment: {
        type: String,
        required: true,
    },
    instrument_token: {
        type: String,
        required: true,
    },
    lotsize: {
        type: Number,
        required: true,
    },
    tradesymbol: {
        type: String,
        required: true,
    },
    exch_seg: {
        type: String,
        required: true,
    },
    tradesymbol_m_w: {
        type: String,
        required: true,
    },
    tkr: {
        type: String,
        default: null,
    },
    a3tkr: {
        type: String,
        default: null,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Stock = model('Stock', StockSchema);

module.exports = Stock;
