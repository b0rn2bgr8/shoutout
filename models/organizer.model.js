var mongoose = require('mongoose');
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
    picture: {type: String, default: ''}
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

module.exports = mongoose.model('Organizer', organizerSchema);