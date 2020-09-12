const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var posts = new Schema({
    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: false
    },
    createdAt : {
        type: Date
    },
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    }
}, { collection: 'posts' });

module.exports = mongoose.model('posts', posts);