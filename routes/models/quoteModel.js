const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    requestor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String
    },
    frosting: {
        type: String
    },
    tiers: {
        type: String
    },
    color: {
        type: String,
        trim: true,
        lowercase: true
    },
    theme: {
        type: String,
        trim: true
    },
    feeds: {
        type: String
    },
    extras: {
        macarons: {
            type: Boolean
        },
        cookies: {
            type: Boolean
        },
        cupcakes: {
            type: Boolean
        }
    },
    needed: {
        type: String
    },
    comment: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('quote', QuoteSchema)