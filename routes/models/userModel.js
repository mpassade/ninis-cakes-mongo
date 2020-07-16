const mongoose = require('mongoose')
const moment = require('moment')

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
        min: 3
    },
    tempPassword: {
        type: Boolean,
        default: true
    },
    reviews: {
        rating: {
            type: Number
        },
        text: [{
            review: {
                type: String,
                trim: true
            },
            timestamp: {
                type: String,
                default: () => {
                    return moment().format('dddd, MMMM Do YYYY, h:mm a')
                }
            }
        }]
    }
})

module.exports = mongoose.model('user', UserSchema)