"use strict";

const { Schema, model } = require('mongoose');

const PlanSubscriptionSchema = new Schema({
    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Plan', // Assuming there's a 'Plan' model to reference
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client', // Assuming there's a 'Client' model to reference
        required: true
    },
    plan_price: {
        type: Number,
        required: true,
        min: 0
    },
    plan_start: {
        type: Date,
        required: true
    },
    plan_end: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'], // Example statuses
        default: 'active'
    },
    del: {
        type: Boolean,
        default: false // Indicates whether the subscription is marked as deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const PlanSubscription = model('PlanSubscription', PlanSubscriptionSchema);

module.exports = PlanSubscription;
