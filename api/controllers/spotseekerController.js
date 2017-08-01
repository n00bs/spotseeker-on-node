'use strict';

var mongoose = require('mongoose'),
    SpotDB = mongoose.model('SpotDB'),
    processor = require('./spotseekerProcessor');

exports.list_all_spots = function(request, response) {
    SpotDB.find({}, function(error, spots) {
        if (error)
            response.send(error);
        response.json(spots);
    });
};

// Not highly developed yet.
// A lot of filters still need to be added on to this.
exports.get_spots_by_filter = function(request, response) {
    if (Object.keys(request.query).length === 0) {
        response.json({ message: "Empty filters are not allowed on spot search. Try requesting /all for all spots"});
    }
    var processed = processor.process_filters(request.query);
    var DEBUG = [processed, request.query];
    response.send(DEBUG);
    /*SpotDB.find({"extended_info.campus": {$in: ["tacoma", "bothell"]}}, function(error, spots) {
        if (error)
            response.send(error);
        response.json(spots);
    });*/
};

exports.create_a_spot = function(request, response) {
    var new_spotdb = new SpotDB(request.body);
    new_spotdb.save(function(error, spot) {
        if (error)
            response.send(error);
        response.json(spot);
    });
};


exports.read_a_spot = function(request, response) {
    SpotDB.findById(request.params.spotId, function(error, spot) {
        if (error)
            response.send(error);
        response.json(spot);
    });
};


exports.update_a_spot = function(request, response) {
    SpotDB.findOneAndUpdate({_id: request.params.spotId}, request.body, {new: true}, function(error, spot) {
        if (error)
            response.send(error);
        response.json(spot);
    });
};


exports.delete_a_spot = function(request, response) {
    SpotDB.remove({_id: request.params.spotId}, function(error, spot) {
        if (error)
            response.send(error);
        response.json({ message: 'Spot successfully deleted' });
    });
};
