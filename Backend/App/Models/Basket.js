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
        default: false // Indicates whether the Basket is marked as deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Basket = model('Basket', BasketSchema);

module.exports = Basket;
