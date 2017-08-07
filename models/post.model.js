var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    body: {type: String, default: ''},
    blob: {type: String, default: ''},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
    location: [Number],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}]

}, {timestamps: {'createdAt': 'createdAt', 'updatedAt': 'updatedAt'}});

postSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Post', postSchema);