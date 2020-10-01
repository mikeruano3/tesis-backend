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
        ref: 'categories'
    },
    postClasification : {
        type: String
    },
    university : { 
        type: Schema.Types.ObjectId, 
        ref: 'categories'
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
    },
    files : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'files'
    }],
    reactions : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'reactions'
    }],
    sharedCount : {
        type: Number
    },
    reactionCount : {
        type: Number
    },
    childComments : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'posts'
    }],
    pinned : {
        type: Number,
        default: 0
    },
    /****** COMMENTS SECTION ******/
    postAsComment: {
        parentCommentOrPost : { 
            type: Schema.Types.ObjectId, 
            ref: 'posts',
        },
        mentionedUser : { 
            type: Schema.Types.ObjectId, 
            ref: 'users'
        }
    }
    /*** END OF COMMENT SECTION ***/
}, { collection: 'posts' });

module.exports = mongoose.model('posts', posts);