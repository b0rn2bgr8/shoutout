var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/user.model');
var twitterConfig = require('./secret.js');

module.exports = function(passport) {

    passport.use('twitter', new TwitterStrategy({
        consumerKey     : twitterConfig.twitter.apikey,
        consumerSecret  : twitterConfig.twitter.apisecret,
        callbackURL     : twitterConfig.twitter.callbackURL

    },
    function(token, tokenSecret, profile, done) {

    
    	process.nextTick(function() {

	        User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

	       	 	
	            if (err)
	                return done(err);

				
	            if (user) {
	                return done(null, user); 
	            } else {
	               
	                var newUser                 = new User();
					
	                newUser.twitter.id          = profile.id;
	                newUser.twitter.token       = token;
	                newUser.twitter.username = profile.username;
	                newUser.twitter.displayName = profile.displayName;
	                newUser.twitter.lastStatus = profile._json.status.text;
					
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;
	                    return done(null, newUser);
	                });
	            }
	        });

		});

    }));

};