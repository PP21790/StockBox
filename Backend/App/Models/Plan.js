"use strict";

const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
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
    price_per_month: {
        type: Number,
        required: true,
        min: 0
    },
    total_month_service: {
        type: Number,
        required: true,
        min: 0
    },
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'Service', // Assuming there's a 'Service' model to reference
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Example statuses
        default: 'active'
    },
    del: {
        type: Boolean,
        default: false // Indicates whether the plan is marked as deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Plan = model('Plan', PlanSchema);

module.exports = Plan;
