var router = require('express').Router();
var passport = require('passport');
var passportConf = require('../config/passport');


var Organizer = require('../models/organizer.model');

router.get('/organizer', function(req, res, next){
    Organizer.find(function(err, organizers){
        if(err){return next(err);}

        res.json(organizers);
    });
});

router.get('/:id', function(req, res, next){
    Organizer.findById({_id: req.params.id}, function(err, organizer){
        if(err){return next(err);}

        res.json(organizer);
    });
});

router.post('/signup-org', function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;
    var newOrganizer = new Organizer({
        email: email,
        password: password             
    });

    newOrganizer.save(function(err){
        if(err){return next(err);}
        res.json({response: "success", user: newOrganizer});
    });
});


router.post('/login-org', function(req, res, next) {
    
    passport.authenticate('local-login', function(err, organizer, info) {
        if (err) {
            return next(err);
        }
        if (!organizer) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(organizer, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                newOrganizer: organizer
            });
        });
    })(req, res, next);
});

router.put('/:id', function(req, res, next){
    Organizer.findById({_id: req.params.id}, function(err, user){
        if(err){return next(err);}

    organizer.name = req.body.name;
    organizer.tel = req.body.tel;     
    organizer.address1 = req.body.address1;
    organizer.address2 = req.body.address2;
    organizer.address3 = req.body.address3;
    organizer.suburb = req.body.suburb;
    organizer.city = req.body.city;
    organizer.province = req.body.province;    
    organizer.username = req.body.username;   
    organizer.picture = req.body.picture;     
        

        organizer.save(function(err){
            if(err){return next(err);}
            res.json({response: "Profile Updated"});
        });
    });
});

module.exports = router;