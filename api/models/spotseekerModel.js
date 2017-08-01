'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// EDIT SCHEMA TO MATCH SPOTSEEKER SERVER
// _id is created by mongoDB
// THIS IS A POOR IMPLEMENTATION -  make more specific
var SpotDBSchema = new Schema({
    id: {
        type: String,
        Required: 'REQUIRED: SPOT ID.'
    },
    etag: {
        type: String
    },
    name: {
        type: String,
        Required: 'REQUIRED: SPOT NAME.'
    },
    types: {
        type: [String]
    },
    location: {},
    capacity: {
        type: String
    },
    display_access_restrictions: {
        type: String
    },
    images: {},
    available_hours: {},
    organization: {
        type: String
    },
    manager: {
        type: String
    },
    extended_info: {},
    items: {},
    last_modified: {
        type: Date,
        default: Date.now
    },
    external_id: {
        type: String
    },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// FIX - make it dynamic
SpotDBSchema.virtual('uri').get(function() {
    return "http://coconut.aca.uw.edu:3000/spots/" + this._id;
});

module.exports = mongoose.model('SpotDB', SpotDBSchema);
