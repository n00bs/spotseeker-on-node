'use strict';
module.exports = function(app) {
    var spotseekerList = require('../controllers/spotseekerController');

    // spotseeker Routes
    app.route('/spots')
        .get(spotseekerList.list_all_spots)
        .post(spotseekerList.create_a_spot);


    app.route('/spots/:spotId')
        .get(spotseekerList.read_a_spot)
        .put(spotseekerList.update_a_spot)
        .delete(spotseekerList.delete_a_spot);
};
