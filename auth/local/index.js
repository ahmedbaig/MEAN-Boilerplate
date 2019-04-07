'use strict';

var express = require('express');
var passport = require('passport');

var auth = require('../auth.service');
const UtilService = require('../../api/utility/util');
const htmlTemplateService = require('../../api/utility/htmltemplates');


var router = express.Router();

router.post('/', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error.message);
    if (!user) return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
    

  })(req, res, next)
});

router.post('/send-forgot-password-email', async function(req, res) {
  try {


    // let token = UtilService.generateRandomToken();


    // let htmlTemplate = htmlTemplateService.ForgotPassword(user, token);
    // UtilService.sendEmail(user.email, 'Renew Password', htmlTemplate)

    // res.json('An email has been sent to your account.');


  } catch (error) {
    return res.status(500).json(error);
  }
})

router.post('/reset-password/:forgotPasswordToken', async function(req, res) {
  try {

    // let user = await UserModel.findOne({
    //   forgotPasswordToken: req.params.forgotPasswordToken
    // });

    // if (!user) {
    //   return res.status(404).send(
    //     'Sorry we could find this user in our system');
    // }

    // user.password = req.body.password;

    // await user.save();

    // res.json('Your password has been reset successfully.');


  } catch (error) {
    return res.status(500).json(error);
  }
})

module.exports = router;
