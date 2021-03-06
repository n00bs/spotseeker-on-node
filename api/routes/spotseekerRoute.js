'use strict';
module.exports = function(app) {
    var spotseekerList = require('../controllers/spotseekerController');

    // spotseeker Routes (v2)
    // based on v1 for spotseeker
    // only supports core aspects of api v1

    // get all spots
    app.route('/api/v1/spot/all')
        .get(spotseekerList.list_all_spots);

    // get spots based on filter or post a spot
    app.route('/api/v1/spot')
        .get(spotseekerList.get_spots_by_filter)
        .post(spotseekerList.create_a_spot);

    // get, post, put spot by mongo _id
    app.route('/api/v1/spot/mongo/:spotId')
        .get(spotseekerList.read_a_spot)
        .put(spotseekerList.update_a_spot)
        .delete(spotseekerList.delete_a_spot);

    // get spot by configured id
    app.route('/api/v1/spot/:spotId')
        .get(spotseekerList.read_a_spot_by_id)
};
