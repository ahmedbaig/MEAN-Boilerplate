'use strict';

var mssql = require('mssql');
var config = require('../config/environment');
var compose = require('composable-middleware');

let connection = config.config;

function isAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            
        });
}

/**
 * Attaches the user object to the request if authenticated and for PI micro controller
 * Otherwise returns 403
 */
function isPiAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            
        });
}

exports.isAuthenticated = isAuthenticated;
exports.isPiAuthenticated = isPiAuthenticated;
