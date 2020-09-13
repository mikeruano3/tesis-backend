const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require("moment");

var users = new Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    fullname : {
        type: String,
        required: true
    },
    profesion : {
        type: String
    },
    city : {
        type: String
    },
    image : {
        type: String
    },
    role : { 
        type: Schema.Types.ObjectId, 
        ref: 'roles',
        required: true
    },
    createdAt : {
        type: Date,
        default: moment().format()
    }
}, { collection: 'users' });

module.exports = mongoose.model('users', users);