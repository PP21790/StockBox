"use strict";

const { Schema, model } = require('mongoose');

const ReferSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a 'User' model to reference
        required: true
    },
    senderearn: {
        type: Number,
        default: 0,
        min: 0
    },
    receiverearn: {
        type: Number,
        default: 0,
        min: 0
    },
    del: {
        type: Boolean,
        default: false // Indicates whether the record is marked as deleted
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Define the model
const Refer = model('Refer', ReferSchema);

module.exports = Refer;
