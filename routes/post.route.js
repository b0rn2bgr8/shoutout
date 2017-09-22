const _ = require('lodash');
const async = require('async');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage()
});
const impUpload = require('./imgUpload');

module.exports = function (router) {
  router.get('/post', function (req, res, next) {
    Post.find()
      .populate('owner')
      .populate('comments')
      .sort('-createdAt')
      .exec(function (err, posts) {
        if (err) { return next(err); }

        res.json({ info: "success", data: posts });
      });
  });

  router.get('/post/:id', function (req, res, next) {
    Post.findById({ _id: req.params.id })
      .populate('owner')
      .populate('comments')
      .exec(function (err, post) {
        if (err) { return next(err); }

        res.json({ info: "success", data: post });
      });
  });

  router.get('/post/user/:id', function (req, res, next) {
    Post.find({ owner: req.params.id })
      .populate('owner')
      .populate('comments')
      .exec(function (err, posts) {
        if (err) { return next(err); }

        res.json({ info: "success", data: posts });
      });
  });

  router.post('/post', multer.single('image'), impUpload.uploadToGcs, function (req, res, next) {
    if(req.file && req.file.cloudStoragePublicUrl){
    async.waterfall([
      function (callback) {
        var new_post = new Post({
          body: req.body.postBody,
          blob: req.file.cloudStoragePublicUrl,
          owner: req.body.owner,
          location: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
        });

        new_post.save(function (err) {
          if (err) { return next(err); }
          callback(null, new_post);
        });
      },
      function (post,callback) {
        User.findById({ _id: post.owner }, function (err, user) {
          if (err) { return next(err); }
          user.posts.push(post._id);
          user.save(function (err) {
            if (err) { return next(err); }
            res.json({ response: "Post created" });
          });
        });
      }
    ]);
  }else{
      res.json({response: "upload failed. try again"});
  }
  });

  router.put('/post/:id', function (req, res, next) {
    Post.findById({ _id: req.params.id }, function (err, post) {
      if (err) { return next(err); }
      _.merge(post, req.body);

      post.save(function (err) {
        if (err) { return next(err); }
        res.json({ info: "Post updated" });
      });
    });
  });

  router.post('/post/comment', function (req, res, next) {
    async.waterfall([
      function (callback) {
        var new_comment = new Comment(req.body);

        new_comment.save(function (err) {
          if (err) { return next(err); }
          callback(null, new_comment);
        });
      },
      function (new_comment, callback) {
        Post.findById({ _id: new_comment.post }, function (err, post) {
          if (err) { return next(err); }
          if (post.comments.indexOf(new_comment._id) >= 0) {
            res.json({ info: "Comment already added" });
          } else {
            post.comments.push(new_comment._id)

            post.save(function (err) {
              if (err) { return next(err); }
              res.json({ info: "Comment added" });
            });
          }
        });
      }
    ]);
  });

  router.put('/post/like/:id', function (req, res, next) {
    Post.findById({ _id: req.params.id }, function (err, post) {
      if (err) { return next(err); }
      if (post.likes.indexOf(req.body.userId) >= 0) {
        post.likes.splice(post.likes.indexOf(req.body.userId), 1);
        post.save(function (err) {
          if (err) { return next(err); }
          res.json({ info: "Unliked" });
        });
      } else {
        post.likes.push(req.body.userId);
        post.save(function (err) {
          if (err) { return next(err); }
          res.json({ info: "Liked" });
        });
      }
    });
  });

  router.delete('/post/:id', function (req, res, next) {
    async.waterfall([
      function (callback) {
        Post.findById({ _id: req.params.id }, function (err, post) {
          if (err) { return next(err); }
          callback(null, post);
        });
      },
      function (post, callback) {
        User.findById({ _id: post.owner }, function (err, user) {
          if (err) { return next(err) }
          user.posts.splice(user.posts.indexOf(req.params.id), 1);
          user.save(function (err) {
            if (err) { return next(err); }
            callback();
          });
        });
      },
      function (callback) {
        Post.findByIdAndRemove({ _id: req.params.id }, function (err) {
          if (err) { return next(err); }
          res.json({ info: "Post removed" });
        });
      }
    ]);

  });
}
