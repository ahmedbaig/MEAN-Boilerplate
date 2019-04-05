'use strict';


var path = require('path');

module.exports = function(app){

    // ANALYTICS USAGE

    app.use('/api/user', require('./api/user'));
    app.use('/api/patient', require('./api/patient'));
    app.use('/api/doctor', require('./api/doctor'));
    app.use('/api/nurse', require('./api/nurse'));
    app.use('/api/hospital', require('./api/hospital'));
    app.use('/api/services', require('./api/services'));
    app.use('/api/qualification', require('./api/qualification'));
    app.use('/api/emergency', require('./api/emergency'));
    app.use('/api/pi', require('./api/pi'));
    app.use('/api/card', require('./api/card'));
    app.use('/api/transaction', require('./api/transaction'));
    app.use('/api/dispute', require('./api/dispute'));


    app.route('/*')
        .get(function(req, res) {
            // Commented path is for angular 6 build post production
            res.sendFile(path.resolve( __dirname + '/dist/App/index.html'));
            // res.sendFile(path.resolve( __dirname + '/index.html'));
        });

}
