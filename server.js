var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    SpotDB = require('./api/models/spotseekerModel'),
    bodyParser = require('body-parser');

var local = 'mongodb://testspot:testpass@coconut.aca.uw.edu:27017/SpotDB';

mongoose.Promise = global.Promise;
mongoose.connect(local, {
    useMongoClient: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/spotseekerRoute');
routes(app);

app.listen(port);

console.log('spotseeker RESTful API server started on: ' + port);
