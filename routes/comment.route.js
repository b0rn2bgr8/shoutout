var _ = require('lodash');
var Comment = require('../models/comment.model');

module.exports = function(router){
    router.get('/comment', function(req, res, next){
        Comment
        .find()
        .populate('owner')
        .sort('-createdAt')
        .exec(function(err, comments){
            if(err){return next(err);}
            res.json({info: "success", data: comments});
        });
    });

    router.get('/comment/:id', function(req, res, next){
        Comment
        .findById({_id: req.params.id})
        .populate('owner')
        .populate('post')
        .exec(function(err, comment){
            if(err){return next(err);}
            res.json({info: "success", data: comment});
        });
    });
}