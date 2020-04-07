'use strict';

const express = require('express');
const auth = require('./auth.service');

const router = express.Router();

router.post('/register' , auth.create);

router.post('/login', auth.loginUser);

router.post('/send-forgot-password-email', auth.forgotPassword);

router.post('/reset-password/:forgotPasswordToken', auth.resetPassword);

router.get('/activate-account/:token', auth.activateAccount);

module.exports = router;
