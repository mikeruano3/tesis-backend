const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var reaction = new Schema({
    post : { 
        type: Schema.Types.ObjectId, 
        ref: 'posts',
        required: true
    },
    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    type : {
        type: Number,
        required: true
    }
}, { collection: 'reactions' });

module.exports = mongoose.model('reactions', reaction);