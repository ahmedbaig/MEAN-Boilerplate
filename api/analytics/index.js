'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./analytics.controller');

router.get('/fetch-trending-users', controller.fetchUsers);

module.exports = router;
