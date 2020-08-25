const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var course = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image : {
        type: String
    }
}, { collection: 'courses' });

module.exports = mongoose.model('courses', course);