var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user.model');
var ConfigAuth = require('./secret.js');

module.exports = function(passport) {

    passport.use('google', new GoogleStrategy({
        clientID        : ConfigAuth.googleAuth.clientID,
        clientSecret    : ConfigAuth.googleAuth.clientSecret,
        callbackURL     : ConfigAuth.googleAuth.callbackURL
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

					
	                newUser.google.id    = profile.id; 	                
	                newUser.google.access_token = access_token; 	                
	                newUser.google.firstName  = profile.name.givenName;
	                newUser.google.lastName = profile.name.familyName; 
	                newUser.google.email = profile.emails[0].value; 

					
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