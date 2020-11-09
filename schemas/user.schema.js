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
    profession : {
        type: String
    },
    direction : {
        type: String
    },
    university : {
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
    },
    passwordResetToken : {
        type: String
    }
}, { collection: 'users' });

module.exports = mongoose.model('users', users);