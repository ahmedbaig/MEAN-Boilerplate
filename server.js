'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const busboyBodyParser = require('busboy-body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4040;

global.ROOTPATH = __dirname;
const _ = require('lodash');
const moment = require('moment');

// let url = 'mongodb://<MLAB url>'
let url = 'mongodb://localhost/practice'
mongoose.connect(url, (err,db)=>{
  if(err) { 
    throw err
  } else {
    console.log('Successfully connected to MongoDB')
  }
}) 

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// CORS PROTECTION
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "access-control-allow-headers,access-control-allow-origin,content-type");

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// APP DEFAULT ROUTE TO DIST
app.use(express.static(path.join(__dirname, 'dist/App/')));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(busboyBodyParser());

app.use(passport.initialize());

app.use(session({
  secret: 'ssshhhhh'
}));

app.use('/auth', require('./auth'))

app.locals.moment = require('moment');

app.get('/dist-user-images/:filename', function(req, res) {
  var filename = req.params.filename.replace(/'/g, '');
  res.sendFile(path.resolve('./dist/App/assets/images/user/' + filename));
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

require('./routes')(app);

app.listen(PORT, function() {
  console.log('Server listening on PORT : ' + PORT);
})