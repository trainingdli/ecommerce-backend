const mongoose = require('mongoose');
const { stream } = require('express-form-data');

module.exports = mongoose.model('user', {
    firstname: {type: String, required: [true, 'firstname is required']},
    lastname: {type: String, required: [true, 'lastname is required']},
    username: {
        type: String, 
        unique: [true, 'username already exist'],
        required: [true, 'Username is required'], 
    },
    phoneNo: {
        type: String,
        required: [true, 'Phone No is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isActive: {
        type: String,
        default: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordTokenExpiry: {
        type: String,
        default: null
    },
    lastUpdated: {type: Date, default: Date.now()}
});


