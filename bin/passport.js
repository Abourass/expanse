const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('users'); // --------------------------------> Load user model <---------------------------

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (/* string */email, password, done) => {
    User.findOne({ // ---------------------------------------------------> Match user <--------------------------------
      email: email.toLowerCase(),
    }).then(user => {
      if (!user) { return done(null, false, { message: 'No user has been found with that email' }); }
      bcrypt.compare(password, user.password, (err, isMatch) => { // ----> Match password <----------------------------
        if (err) throw err;
        if (isMatch) { return done(null, user); }
        return done(null, false, { message: 'Password Incorrect' });
      });
    });
  }));
  passport.serializeUser((user, done) => { done(null, user.id); });
  passport.deserializeUser((id, done) => { User.findById(id, (err, user) => { done(err, user); }); });
};
