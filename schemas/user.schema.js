const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
        type: Date
    }
}, { collection: 'users' });

module.exports = mongoose.model('users', users);