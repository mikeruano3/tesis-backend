const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require("moment");

var categories = new Schema({
    parentCategory : { 
        type: Schema.Types.ObjectId, 
        ref: 'categories'
    },
    childCategories : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'categories'
    }],
    categoryKeyword : {
        type: String,
        required: true
    },
    avatarImg : {
        type: String
    },
    avatarTitle : {
        type: String
    },
    avatarSubtitle : {
        type: String
    },
    topImg : {
        type: String
    },
    title : {
        type: String
    },
    subtitle : {
        type: String
    },
    link : {
        type: String
    }
}, { collection: 'categories' });

module.exports = mongoose.model('categories', categories);