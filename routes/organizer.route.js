var passport = require('passport');
var passportConf = require('../config/passport');
var Organizer = require('../models/organizer.model');
var _ = require('lodash');

module.exports = function (router) {

    router.get('/organizer', function (req, res, next) {
        Organizer.find(function (err, organizers) {
            if (err) { return next(err); }
            res.json(organizers);
        });
    });

    router.get('/organizer/:id', function (req, res, next) {
        Organizer.findById({ _id: req.params.id }, function (err, organizer) {
            if (err) { return next(err); }
            res.json(organizer);
        });
    });

    router.post('/organizer', function (req, res, next) {
        var newOrganizer = new Organizer(req.body);
        newOrganizer.save(function (err) {
            if (err) { return next(err); }
            res.json({ response: "success"});
        });
    });

    router.put('organizer/:id', function (req, res, next) {
        User.findById({ _id: req.params.id }, function (err, organizer) {
            if (err) { return next(err); }

            _.merge(organizer, req.body);


            user.save(function (err) {
                if (err) { return next(err); }
                res.json({ response: "Info Updated" });
            });
        });
    });
}