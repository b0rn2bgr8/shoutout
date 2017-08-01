var express = require('express');
var morgan = require('morgan');

var app = express();




app.listen(3000,function(){
	console.log('app is now running on port 3000');
});