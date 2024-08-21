"use strict"

const { Schema, model } = require('mongoose');

const ActivitylogsModel = Schema({
    message: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    add_by: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    ipaddress: {
        type: String,
        required: true,
        trim: true,
        default: null
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
const Activitylogs_Model = model('Activitylogs', ActivitylogsModel);



module.exports = Activitylogs_Model;
