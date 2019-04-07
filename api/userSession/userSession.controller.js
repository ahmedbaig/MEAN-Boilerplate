'use strict';

const path = require('path');
const fs = require('fs');

const _ = require('lodash');
const moment = require('moment');

const UserSessionModel = require('./userSession.model');
const UserModel = require('../user/user.model');

exports.verify = async function(req, res) {
  if (req.query.token != undefined) {
    try {
      UserSessionModel.findById(req.query.token, (err, sessions) => {
        if (err) {
          //console.log("err", err);
        }
        //console.log('Session found', sessions);
        if (sessions != undefined) {
          if (!sessions.isDeleted) {
            //console.log(sessions.userId);
            UserModel.findOne({
              _id: sessions.userId
            }, (err, user) => {
              //console.log('User', user[0])
              if (user.profileApproved) {
                res.send({
                  success: true,
                  user: user
                });
              } else {
                res.send({
                  success: false,
                  message: "Account not approved"
                });
              }
            });
          } else {
            res.send({
              success: false,
              message: "Session Deleted"
            });
          }
        }else{
          res.send({
            success: false,
            messaage: "undefined"
          })
        }
      });
    } catch (e) {
      res.send({
        success: false,
        messaage: "undefined"
      })
    }
  } else {
    res.send({
      success: false,
      message: "No session token found"
    })
  }
}

exports.logout = async function(req, res) {
  UserSessionModel.findOneAndUpdate({
    _id: req.query.token,
    isDeleted: false
  }, {
    $set: {
      "isDeleted": true
    }
  }, null, (err, sessions) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      return res.send({
        success: true,
        message: 'Good'
      });
    }
  });
}

exports.allSessions = async function(req, res) {
  let sessions = UserSessionModel.find({userId: req.params.userId})
  if(sessions != undefined && sessions != '[]'){
    return res.send({
      success: true,
      sessions: sessions
    })
  }else{
    return res.send({
      success: false,
      messaage: "No sessions found"
    })
  }
}


exports.closeSession = async function(req, res) {
  UserSessionModel.findOneAndUpdate({
    _id: req.params.token,
    isDeleted: false
  }, {
    $set: {
      "isDeleted": true
    }
  }, null, (err, sessions) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      return res.send({
        success: true,
        message: 'Good'
      });
    }
  });
}
