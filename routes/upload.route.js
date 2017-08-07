var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var config = require('../config/secret');
var url = config.database;
var multer = require('multer');
var util = require('util');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});
 
router.get('/uploadpicture', function(req, res){ res.render('/uplodpicture'); });
 
router.post('/uploadpicture', upload.single('picture'), function (req, res){
 
if (req.file == null) {

  res.render('/uploadpicture', { title:'Please select a picture file to submit!'});  
} else {
 
MongoClient.connect(config.database, function(err, db){
  
   var newImg = fs.readFileSync(req.file.path);
  
   var encImg = newImg.toString('base64');
  
   var newItem = {
      description: req.body.description,
      contentType: req.file.mimetype,
      size: req.file.size,
      img: Buffer(encImg, 'base64')
   };
 
db.collection('Images').insert(newItem, function(err, result){
   if (err) { console.log(err); };
      var newoid = new ObjectId(result.ops[0]._id);
      fs.remove(req.file.path, function(err) {
         if (err) { console.log(err) };
         res.render('index', {title:'Thanks for the Picture!'});
         });
      });
   });
   };
});