const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var reaction = new Schema({
    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: true
    },
    count : {
        type: Number,
        required: true
    },
    type : {
        type: Number,
        required: true
    }
}, { collection: 'reactions' });

module.exports = mongoose.model('reactions', reaction);