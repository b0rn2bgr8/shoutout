var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
    description : {type: String, default: ''},    
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    picture: {type: Schema.Types.ObjectId, ref:'User'},
    Type:{type: String, default:''},
    size:   {type: Number},
    
}, {timestamps: {'createdAt': 'createdAt', 'updatedAt': 'updatedAt'}});

module.exports = mongoose.model('Upload', uploadSchema);