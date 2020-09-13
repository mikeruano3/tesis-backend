const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require("moment");

var comments = new Schema({
    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    mentionedUser : { 
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    parentPost : { 
        type: Schema.Types.ObjectId, 
        ref: 'posts',
        required: true
    },
    parentComment : { 
        type: Schema.Types.ObjectId, 
        ref: 'comments'
    },
    createdAt : {
        type: Date,
        default: moment().format()
    },
    title : {
        type: String
    },
    content : {
        type: String,
        required: true
    }
}, { collection: 'comments' });

module.exports = mongoose.model('comments', comments);