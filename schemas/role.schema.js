const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var role = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    roleType : {
        type: Number,
        required: true
    }
}, { collection: 'roles' });

module.exports = mongoose.model('roles', role);