var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.model');
var fbConfig = require('./secret.js');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.facebook.appID,
        clientSecret    : fbConfig.facebook.appSecret,
        callbackURL     : fbConfig.facebook.callbackUrl
    },

   
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

	
		process.nextTick(function() {

			
	        User.findOne({ 'id' : profile.id }, function(err, user) {

	        	
	            if (err)
	                return done(err);

				
	            if (user) {
	                return done(null, user); 
	            } else {
	               
	                var newUser = new User();

					
	                newUser.fb.id    = profile.id; 	                
	                newUser.fb.access_token = access_token; 	                
	                newUser.fb.firstName  = profile.name.givenName;
	                newUser.fb.lastName = profile.name.familyName; 
	                newUser.fb.email = profile.emails[0].value; 

					
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