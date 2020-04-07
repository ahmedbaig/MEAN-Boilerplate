'use strict';

var UserModel = require('../api/user/user.model');
var UserSession = require('../api/userSession/userSession.model');
 
const UserService = require('../api/user/user.service');
const UtilService = require('../api/utility/util');
const htmlTemplateService = require('../api/utility/htmltemplates');

exports.create = function(req,res){

  UserService.create(req.body.user)
    .then( async function(user){

      let emailtoken = UtilService.generateRandomToken();
      let htmlTemplate =  htmlTemplateService.accountActivation( user, emailtoken );

      // sending email to user for account activation
      UtilService.sendEmail(user.email,'Account Activation',htmlTemplate);

      // saving token in user model
      UserService.update({ _id : user._id },{ 'accountActivated.token': emailtoken});

      res.json({
        success: true,
        message: "You have successfully signed up. Account activition email has been sent to your account"
      });

    })
    .catch(function(error){
      if(error.errors && error.errors.email && error.errors.email.message === 'The specified email address is already in use.'){
        res.send({message: 'The specified email address is already in use.', success: false})
      }else if(error.errors && error.errors.email && error.errors.email.message === "Path `email` is required."){
        res.send({message: 'Email is required', success: false})
      }else if(error.message === 'Invalid password'){
        res.send({message: 'Invalid password', success: false})
      }else{
        res.send({message: 'Server Error', success: false})
      }
    })

};

exports.loginUser = function (req, res){
  try{
    //console.log(req.body);
    if(req.body.user !== null){
      var {email, password} = req.body.user;

      UserModel.findOne({
        email: email.toLowerCase(),
      }, function(err, user) {

        if (err){ res.send({success: false, message: err})}

        else if (!user) {
          //console.log(user);
          return res.send({
            success: false,
            message: 'This email is not registered.'
          });
        } else  {
          if(!user.accountActivated.isTrue){
            return res.send({
              success: false,
              message: 'This account is not confirmed via e-mail. Please check your e-mail box'
            });
          }
          if(!user.profile_approved){
            return res.send({
              success: false,
              message: 'This account is not confirmed by a sound legal moderator.'
            });
          }
          if (!user.authenticate(password)) {
            return res.send({
              success: false,
              message: 'This password is not correct.'
            });
          }
          let variation = {
            role:user.role,
            type:user.type,
            profile_approved: user.profile_approved,
            accountActivated: user.accountActivated.isTrue
          };
          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.save((err, doc) => {
            if (err) {
              //console.log(err);
              var user = {
                success: false,
                message: 'Error: Server error'
              };
            }
            //console.log('Session Token: ', doc._id);
            var user = {
              success: true,
              message: 'Valid sign in',
              token: doc._id,
              data: variation
            };
            return res.send(user);
          });
        }
      });
    }else{
      return res.send({
        success: false,
        message: "Please enter email and password"
      })
    }

  }
  catch(e){
    return res.send({
      success: false,
      message: e.message
    })
  }

};

exports.forgotPassword = async function(req, res){
  try {
    //console.log(req.body.email);
    let user = await UserModel.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.send({success: false, message:
          'Sorry we could find this email in our system'});
    }

    let token = UtilService.generateRandomToken();

    await UserModel.update({
      _id: user._id
    }, {
      forgotPasswordToken: token
    });

    let htmlTemplate = htmlTemplateService.ForgotPassword(user, token);
    UtilService.sendEmail(user.email, 'Renew Password', htmlTemplate);

    res.send({success: true, message: 'An email has been sent to your account.'});


  } catch (error) {
    return res.send({success: false, message: error});
  }
};

exports.resetPassword = async function(req, res){
  try {
    //console.log(req.params.forgotPasswordToken, req.body.params);
    let user = await UserModel.findOne({
      forgotPasswordToken: req.params.forgotPasswordToken
    });

    if (!user) {
      return res.send({success: false, message:
          'Sorry we could find this user in our system'});
    }

    user.password = req.body.password;
    user.forgotPasswordToken = null;

    await user.save();

    res.send({success: true, message: 'Your password has been reset successfully.'});


  } catch (error) {
    return res.send({success: false, message: error});
  }
};

exports.activateAccount = async function(req, res){
  try {
    //console.log(req.params.token);
    let user = await UserModel.findOne({
      "accountActivated.token": req.params.token
    });

    if (!user) {
      return res.send({success: false, message:
          'Sorry we could find this user in our system'});
    }

    user.accountActivated.token = null;
    user.accountActivated.isTrue = true;

    await user.save();

    res.send({success: true, message: 'Your account has been activated successfully'});


  } catch (error) {
    return res.send({success: false, message: error});
  }
};

