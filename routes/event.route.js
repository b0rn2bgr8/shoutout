var router = require('express').Router();

var Event = require('../models/event.model');

router.get('/events',function(req,res,next){
     Event.find(function(err, events){
        if(err){return next(err);}
        
        res.json(events);
    });
});

router.get('events/:id', function(req, res, next){
    Event.findById({_id: req.params.id}, function(err, event){
        if(err){return next(err);}
        
        res.json(event);
    });
});
router.get('/create-event',function(req,res,next){
    if(err) return next(err);

    res.render('/create-event');
});

router.post('/create-event', function(req, res, next){
    
    var title = req.body.title;
    var venue = req.body.venue;   
    var address = req.body.address;   
    

    var newEvent = new Event({
    title: title,
    venue: venue,      
    address: address          
    });

    newEvent.save(function(err){
        if(err){return next(err);}
        res.json({response: "success", user: newEvent});
    });
});

router.put('event/:id', function(req, res, next){
    Event.findById({_id: req.params.id}, function(err, user){
        if(err){return next(err);}

    event.title = req.body.title;
    event.venue = req.body.venue;   
    event.address = req.body.address; 
   // event.organizer = req.body.organizer;
    //event.date = req.body.date;

        user.save(function(err){
            if(err){return next(err);}
            res.json({response: "Profile Updated"});
        });
    });
});
module.exports = router