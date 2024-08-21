"use strict";

const { Schema, model } = require('mongoose');

const CouponSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,  // Ensure each coupon code is unique
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],  // Example types: 'percentage' or 'fixed'
        trim: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    del: {
        type: Boolean,
        default: false // Indicates whether the coupon is deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Coupon = model('Coupon', CouponSchema);

module.exports = Coupon;
