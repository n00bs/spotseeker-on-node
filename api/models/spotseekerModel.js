'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// THINK ABOUT REMOVING 'ID' AS A FIELD ALTOGETHER

// ImageSchema is a subschema for SpotDBSchema and ItemSchema.
// Represents images for a spot.
// _id is created by mongoDB.
var ImageSchema = new Schema({
    id: {
        type: Number
    },
    url: {
        type: String
    },
    // content-type breaks the schema creation
    /*content-type: {
        type: String
    },*/
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    modification_date: {
        type: Date,
        default: Date.now
    },
    upload_user: {
        type: String
    },
    upload_application: {
        type: String
    },
    thumbnail_root: {
        type: String
    },
    description: {
        type: String
    },
    display_index: {
        type: Number
    }
});

// ItemSchema is a subschema for SpotDBSchema.
// Represents items in a spot.
// _id is created by mongoDB.
var ItemSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    // extended_info has no predefined structure
    extended_info: {},
    images: {
        type: [ImageSchema]
    }
});

// SpotDBSchema is the schema used by the application.
// _id is created by mongoDB.
var SpotDBSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    etag: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: [String]
    },
    location: {
        // Will need to typecast to double for queries
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        height_from_sea_level: {
            type: String
        },
        // end of typecast
        building_name: {
            type: String
        },
        floor: {
            type: String
        },
        room_number: {
            type: String
        }
    },
    capacity: {
        type: Number
    },
    display_access_restrictions: {
        type: String
    },
    images: {
        type: [ImageSchema]
    },
    available_hours: {
        monday: {
            type: [Array]
        },
        tuesday: {
            type: [Array]
        },
        wednesday: {
            type: [Array]
        },
        thursday: {
            type: [Array]
        },
        friday: {
            type: [Array]
        },
        saturday: {
            type: [Array]
        },
        sunday: {
            type: [Array]
        }
    },
    organization: {
        type: String
    },
    manager: {
        type: String
    },
    // extended_info has no predefined structure
    extended_info: {},
    items: {
        type: [ItemSchema]
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
    external_id: {
        type: String
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// FIX - make it dynamic
SpotDBSchema.virtual('uri').get(function() {
    return "http://coconut.aca.uw.edu:3000/api/v1/spot/mongo/" + this._id;
});
// FEATURE - make image and item url virtual too

module.exports = mongoose.model('SpotDB', SpotDBSchema);
