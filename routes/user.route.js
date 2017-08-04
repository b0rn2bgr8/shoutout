var passport = require('passport');
var _ = require('lodash');
var passportConf = require('../config/passport');
var async = require('async');

var User = require('../models/user.model');

module.exports = function (router) {

    router.get('/user', function (req, res, next) {
        User.find(function (err, users) {
            if (err) { return next(err); }

            res.json(users);
        });
    });

    router.get('/user/:id', function (req, res, next) {
        User.findById({ _id: req.params.id }, function (err, user) {
            if (err) { return next(err); }

            res.json(user);
        });
    });

    router.post('/user/signup', function (req, res, next) {

        var newUser = new User(req.body);

        newUser.save(function (err) {
            if (err) { return next(err); }
            res.json({ response: "success", user: newUser });
        });
    });

    router.post('/user/login', function (req, res, next) {

        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function (err) {
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

    router.put('/user/:id', function (req, res, next) {
        User.findById({ _id: req.params.id }, function (err, user) {
            if (err) { return next(err); }

            _.merge(user, req.body);
            user.save(function (err) {
                if (err) { return next(err); }
                res.json({ response: "Profile Updated" });
            });
        });
    });

    router.put('/user/follow/:id', function(req, res, next){
        async.waterfall([
            function(callback){
                User.findById({_id: req.params.id}, function(err, user){
                    if(err){return next(err);}
                    if(user.followers.indexOf(req.body.userId) >= 0){
                        async.waterfall([
                            function(callback){
                                user.followers.splice(user.followers.indexOf(req.body.userId), 1);
                                user.save(function(err){
                                    if(err){return next(err);}
                                    callback(null, user);
                                });
                            },
                            function(followed, callback){
                                User.findById({_id: req.body.userId}, function(err, user){
                                    if(err){return next(err);}
                                    user.following.splice(user.following.indexOf(followed._id), 1);
                                    user.save(function(err){
                                        if(err){return next(err);}
                                        callback();
                                    });
                                });
                            },
                            function(){
                                res.json({info: 'Unfollowed'});
                            }
                        ]);
                    }else{
                        async.waterfall([
                            function(callback){
                                user.followers.push(req.body.userId);
                                user.save(function(err){
                                    if(err){return next(err);}
                                    callback(null, user);
                                });
                            },
                            function(followed, callback){
                                User.findById({_id: req.body.userId}, function(err, user){
                                    user.following.push(user._id);
                                    user.save(function(err){
                                        if(err){return next(err);}
                                        callback();
                                    });
                                });
                            },
                            function(){
                                res.json({info: "followed"});
                            }
                        ]);
                    }
                });
            }
        ]);
        
    });

    router.delete('/user/:id', function (req, res, next) {
        User.findByIdAndRemove({ _id: req.params.id }, function (err) {
            if (err) { return next(err); }
            res.json({ response: "User account removed" });
        });
    });
}