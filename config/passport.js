var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('express-flash');
var User = require('../models/user.model');
var facebook = require('./facebook');
var twitter = require('./twitter');



passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        if (!user.comparePassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

exports.isAuthenticated = function(req, res, done) {
    if (req.isAuthenticated()) {
        return done();
    }
    res.json({ message: 'Unauthenticated' });

    facebook(passport);
    twitter(passport);
    google(passport);
}