'use strict';

var express = require('express');
var controller = require('./userSession.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

module.exports = router;
