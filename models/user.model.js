var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: {type: String, default: ''},
    lastname: {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    picture: {type: String, default: ''},
	bio: {type: String, default: ''},
	address1: {type: String, default: ''},
    address2: {type: String, default: ''},
    address3: {type: String, default: ''},
    suburb: {type: String, default: ''},
    city: {type: String, default: ''},
    province: {type: String, default: ''},
    location: [Number],
	date_of_birth: {type: Date, default: ''},
	email: {type: String, default: ''},
	following: [{type: Schema.Types.ObjectId, ref: 'User'}],
	followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
		fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	},
	twitter: {
		id: String,
		token: String,
		username: String,
		displayName: String,		
	},
	google:{
		id: String,
		token: String,
		username: String,
		displayName: String,
	}

},{timestamps: {createdAt: 'created_at'}});

userSchema.pre('save', function(next){

	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt){
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
		if (err) {return next(err);}
		user.password = hash;	
		next();
		});
		
	});
});


userSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.gravatar = function(size){
	if(!this.size)
		size = 200;

	if(!this.email) return '' + size + '&d=retro';
	var md5 = crypto.createHash('md5').update(this.email).digest('hex');

	return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);
