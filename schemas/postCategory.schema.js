const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var postCategory = new Schema({
    title : {
        type: String,
        required: true
    }
}, { collection: 'postcategories' });

module.exports = mongoose.model('postcategories', postCategory);