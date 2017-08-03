var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var config = require('../config/secret');
   // Your mLabs connection string
var url = config.database;
var multer = require('multer');
var util = require('util');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});
 
// Default route http://localhost:3000/
router.get('/uploadpicture', function(req, res){ res.render('/uplodpicture'); });
 
// Form POST action handler
router.post('/uploadpicture', upload.single('picture'), function (req, res){
 
if (req.file == null) {
  // If Submit was accidentally clicked with no file selected...
  res.render('/uploadpicture', { title:'Please select a picture file to submit!'});  
} else {
 
MongoClient.connect(url, function(err, db){
   // read the img file from tmp in-memory location
   var newImg = fs.readFileSync(req.file.path);
   // encode the file as a base64 string.
   var encImg = newImg.toString('base64');
   // define your new document
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