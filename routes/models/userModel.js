const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    tempPassword: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('user', UserSchema)