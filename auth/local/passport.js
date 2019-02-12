var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


exports.setup = function(User) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      
    }
  ));
};
