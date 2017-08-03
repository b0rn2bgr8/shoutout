var router = require('express').Router();
var passport = require('passport');
var passportConf = require('../config/passport');

var User = require('../models/user.model');

router.get('/', function(req, res, next){
    User.find(function(err, users){
        if(err){return next(err);}
        
        res.json(users);
    });
});

router.get('/:id', function(req, res, next){
    User.findById({_id: req.params.id}, function(err, user){
        if(err){return next(err);}
        
        res.json(user);
    });
});

router.post('/signup', function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;
    var newUser = new User({
        email: email,
        password: password,           
    });

    newUser.save(function(err){
        if(err){return next(err);}
        res.json({response: "success", user: newUser});
    });
});

router.post('/login', function(req, res, next) {
    
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                user: user
            });
        });
    })(req, res, next);
});

router.put('/:id', function(req, res, next){
    User.findById({_id: req.params.id}, function(err, user){
        if(err){return next(err);}

        user.firstname = req.body.firstname; 
        user.lastname = req.body.lastname; 
        user.username = req.body.username;        
        user.picture = req.body.picture;
        user.bio = req.body.bio; 
        user.address1 = req.body.address1;
        user.address2 = req.body.address2;
        user.address3 = req.body.address3; 
        user.suburb = req.body.suburb;
        user.city = req.body.city;
        user.province = req.body.province;         
        user.date_of_birth = req.body.date_of_birth;         
        

        user.save(function(err){
            if(err){return next(err);}
            res.json({response: "Profile Updated"});
        });
    });
});
/*router.delete('/:id', function(req, res, next){
    User.findById({_id: req.params.id}, function(err, user){
        if(err){return next(err);}               
        

        user.save(function(err){
            if(err){return next(err);}
            res.json({response: "User Removed"});
        });
    });
});*/

module.exports = router;