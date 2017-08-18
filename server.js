var express = require('express');
var morgan = require('morgan');
var flash = require('express-flash');
var helmet = require('helmet');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

var config = require('./config/secret');
//google cloud storage
/*var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shoutout-fdf97.firebaseio.com"
});*/

var mime = require('mime');
const keyFilename="./shoutout.json"; //replace this with api key file
const projectId = "shoutout-fdf97" //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);

const filePath = `./package.json`;
const uploadTo = `subfolder/package.json`;
const fileMime = mime.lookup(filePath);

bucket.upload(filePath, {
    destination: uploadTo,
    public: true,
    metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
}, function (err, file) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});


function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/shoutout-fdf97/${encodeURIComponent(storageName)}`;

}
//////////////////////////////////////////////////////////////////////////

mongoose.connect(config.database,function(err){
	if(err){
		console.log('failed to connect database');
	}
	else{
		console.log('Successfully connected database');
	}
});

var app = express();

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());


eventRoute = require('./routes/event.route')(app);
organizerRoute = require('./routes/organizer.route')(app);
userRoute = require('./routes/user.route')(app);
postRoute = require('./routes/post.route')(app);
commentRoute = require('./routes/comment.route')(app);


app.listen(config.port,function(){
	console.log('app is now running on port '+ config.port);
});