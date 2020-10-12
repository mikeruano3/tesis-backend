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
        ref: 'categories'
    },
    createdAt : {
        type: Date,
        default: moment().format()
    },
    fileName : {
        type: String
    },
    fileType : {
        type: String
    },
    firestoreId : {
        type: String
    },
    firestoreFolder : {
        type: String
    },
    firestoreDownloadLink : {
        type: String
    }
}, { collection: 'files' });

module.exports = mongoose.model('files', files);