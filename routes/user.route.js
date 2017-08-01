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
        username: uname     
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


        user.save(function(err){
            if(err){return next(err);}
            res.json({response: "Profile Updated"});
        });
    });
});

module.exports = router;