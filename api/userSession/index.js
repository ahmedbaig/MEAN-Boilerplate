'use strict';

var express = require('express');
var controller = require('./userSession.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/verify', controller.verify);

router.get('/all-sessions/:userId', controller.allSessions);

router.get('/close-session/:token', controller.closeSession);

router.get('/logout', controller.logout);

module.exports = router;
