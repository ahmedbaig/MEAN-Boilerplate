'use strict';
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var UserSession = require('../api/userSession/userSession.model')

function isAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            UserSession.findById(req.query.token, (err, sessions) => {
                if (err) {
                  //console.log("err", err);
                }
                if (sessions !== undefined) {
                  if (!sessions.isDeleted) {
                    //console.log(sessions.userId);
                    User.findOne({
                      _id: sessions.userId
                    }, (err, user) => {
                      //console.log('User', user[0])
                      if (user.profile_approved) {
                        req.user = user;
                        next();
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
                    message: "Session Error"
                  })
                }
            });
        });
}

function isAdminAuthenticated() {
  return compose()
      // Attach user to request
      .use(function(req, res, next) {
          UserSession.findById(req.params.token, (err, sessions) => {
              if (err) {
                //console.log("err", err);
              }
              if (sessions !== undefined) {
                if (!sessions.isDeleted) {
                  //console.log(sessions.userId);
                  User.findOne({
                    _id: sessions.userId
                  }, (err, user) => {
                    if (user.profile_approved && user.type === "admin") {
                      req.user = user;
                      next();
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
                  message: "Session Error"
                })
              }
          });
      });
}

var socketConnections = {};


exports.isAuthenticated = isAuthenticated;
exports.isAdminAuthenticated = isAdminAuthenticated;
exports.socketConnections = socketConnections;
