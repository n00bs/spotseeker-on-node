'use strict';

var mongoose = require('mongoose'),
    SpotDB = mongoose.model('SpotDB');

exports.list_all_spots = function(req, res) {
    SpotDB.find({}, function(err, spots) {
        if (err)
            res.send(err);
        res.json(spots);
    });
};

exports.create_a_spot = function(req, res) {
    var new_spotdb = new SpotDB(req.body);
    new_spotdb.save(function(err, spot) {
        if (err)
            res.send(err);
        res.json(spot);
    });
};


exports.read_a_spot = function(req, res) {
    SpotDB.findById(req.params.spotId, function(err, spot) {
        if (err)
            res.send(err);
        res.json(spot);
    });
};


exports.update_a_spot = function(req, res) {
    SpotDB.findOneAndUpdate({_id: req.params.spotId}, req.body, {new: true}, function(err, spot) {
        if (err)
            res.send(err);
        res.json(spot);
    });
};


exports.delete_a_spot = function(req, res) {
    SpotDB.remove({_id: req.params.spotId}, function(err, spot) {
        if (err)
            res.send(err);
        res.json({ message: 'Spot successfully deleted' });
    });
};
