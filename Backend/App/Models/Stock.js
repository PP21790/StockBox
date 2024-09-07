"use strict";

const { Schema, model } = require('mongoose');

const StockSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    add_by: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    status: {
        type: Boolean,
        default: true // assuming true means active and false means inactive
    },
    del: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Stock = model('Stock', StockSchema);

module.exports = Stock;