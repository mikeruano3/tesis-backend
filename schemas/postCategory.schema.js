const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var postCategory = new Schema({
    name : {
        type: String,
        required: true
    }
}, { collection: 'postcategories' });

module.exports = mongoose.model('postcategories', postCategory);