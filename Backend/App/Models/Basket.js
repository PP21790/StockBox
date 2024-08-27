"use strict";

const { Schema, model } = require('mongoose');

const BasketSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    accuracy: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // Rename total_month_service to totaldays
    validity: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Example statuses
        default: 'active'
    },
    add_by: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    del: {
        type: Boolean,
        default: false // Indicates whether the Basket is marked as deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Basket = model('Basket', BasketSchema);

module.exports = Basket;
