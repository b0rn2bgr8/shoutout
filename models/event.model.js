var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {type: String},
    venue: {type: String, default: ''},
    location: [Number],
    address: {type: String, default: ''},
    organizer: {type: Schema.Types.ObjectId, ref: 'Organizer'},
    date: Date
},
    {timestamps: {createdAt: 'created_at'}}
);

module.exports = mongoose.model('Event', eventSchema);