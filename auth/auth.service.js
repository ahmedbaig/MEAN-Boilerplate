'use strict';
var compose = require('composable-middleware');

function isAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            next();
        });
}
function isAdmin() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            next();
        });
}


exports.isAuthenticated = isAuthenticated;
exports.isAdmin= isAdmin;

