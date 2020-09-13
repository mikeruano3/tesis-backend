const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require("moment");

var posts = new Schema({
    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    postCategory : { 
        type: Schema.Types.ObjectId, 
        ref: 'postcategories',
        required: true
    },
    createdAt : {
        type: Date,
        default: moment().format()
    },
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    files : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'files'
    }],
    reactions : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'reactions'
    }],
    comments : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'comments'
    }],
    sharedCount : {
        type: Number
    }
}, { collection: 'posts' });

module.exports = mongoose.model('posts', posts);