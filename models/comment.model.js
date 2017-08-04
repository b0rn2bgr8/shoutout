var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    body: {type: String, default: ''},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {timestamps: {'createdAt': 'createdAt', 'updatedAt': 'updatedAt'}});

module.exports = mongoose.model('Comment', commentSchema);