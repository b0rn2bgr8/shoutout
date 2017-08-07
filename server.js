var express = require('express');
var morgan = require('morgan');
var flash = require('express-flash');
var helmet = require('helmet');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

var config = require('./config/secret');

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