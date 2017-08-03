var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
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
	password: {type: String, default: ''}
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

module.exports = mongoose.model('User', userSchema);