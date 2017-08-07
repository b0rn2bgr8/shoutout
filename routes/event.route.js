var Event = require('../models/event.model');
var _ = require('lodash');

module.exports = function (router) {

    router.get('/event', function (req, res, next) {
        Event.find(function (err, events) {
            if (err) { return next(err); }
            res.json(events);
        });
    });

    router.get('/event/:id', function (req, res, next) {
        Event.findById({ _id: req.params.id }, function (err, event) {
            if (err) { return next(err); }
            res.json(event);
        });
    });

    router.post('/event', function (req, res, next) {
        var newEvent = new Event(req.body);
        newEvent.save(function (err) {
            if (err) { return next(err); }
            res.json({ response: "success"});
        });
    });

    router.put('/event/:id', function (req, res, next) {
        Event.findById({ _id: req.params.id }, function (err, event) {
            if (err) { return next(err); }

            _.merge(event, req.body);
            event.save(function (err) {
                if (err) { return next(err); }
                res.json({ response: "Event Updated" });
            });
        });
    });
}