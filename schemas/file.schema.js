const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require("moment");

var files = new Schema({
    associatedPost : { 
        type: Schema.Types.ObjectId, 
        ref: 'posts'
    },
    postCategory : { 
        type: Schema.Types.ObjectId, 
        ref: 'categories',
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
    description : {
        type: String,
        required: true
    },
    link : {
        type: String,
        required: true
    }
}, { collection: 'files' });

module.exports = mongoose.model('files', files);