var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var organizerSchema = new Schema({
    name: {type: String},
    tel: {type: String, default: ''},
    email: {type: String, default: ''},
    address1: {type: String, default: ''},
    address2: {type: String, default: ''},
    address3: {type: String, default: ''},
    suburb: {type: String, default: ''},
    city: {type: String, default: ''},
    province: {type: String, default: ''},
    password: {type: String, default: ''},
    username: {type: String, default: ''},
	picture: {type: String, default: ''},
	followers: {type: Schema.Types.ObjectId, ref: 'Organizer'},
	following: {type: Schema.Types.ObjectId, ref: 'Organizer'},
	events: {type: Schema.Types.ObjectId, ref: 'Event'}
},{timestamps: {createdAt: 'created_at'}});

organizerSchema.pre('save', function(next){

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


organizerSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

organizerSchema.methods.gravatar = function(size){
	if(!this.size)
		size = 200;

	if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
	var md5 = crypto.createHash('md5').update(this.email).digest('hex');

	return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('Organizer', organizerSchema);