'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// EDIT SCHEMA TO MATCH SPOTSEEKER SERVER
var SpotDBSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('SpotDB', SpotDBSchema);
