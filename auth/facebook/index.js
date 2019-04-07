'use strict';

var express = require('express');
var FB = require('fb'),
    fb = new FB.Facebook({});
var auth = require('../auth.service');
var router = express.Router();

var staffyApp = FB.extend({
    appId: '911164685709722',
    appSecret: '9f19dacfe86940a427f0b7b29de4d787'
})


router.post('/', function(req, res, next) {
    
    var accessToken = req.body.accessToken;

    _getFbProfile(accessToken)
        .then(function(facebookProfile){
            return _checkUserProfileInDatabase(facebookProfile)
        })
        .then(function(databaseResponse) {
           
            var token = auth.signToken(databaseResponse.user._id, databaseResponse.user.role);
            res.json({
                token: token
            });

        })

});

function _getFbProfile(accessToken) {
    return new Promise(function(success, error) {
        FB.api('/me?fields=email,first_name,last_name', {
            access_token: accessToken
            // fields: ['email', 'name']
            // scope: 'email,name',
            // return_scopes: true
        }, function(res) {
            if (!res || res.error) {
                //console.log(!res ? 'error occurred' : res.error);
                error(res.error);
            }
            //console.log(res);
            success(res);
        });
    })
}

function _checkUserProfileInDatabase(profile) {

    return new Promise(function(success, error) {
        
        var condition = {
            $or:[{
                'facebook.uid':profile.id
            }]
        }

        if(profile.email){
            condition['$or'].push({'email': profile.email});
        }

       
    });

}

module.exports = router;