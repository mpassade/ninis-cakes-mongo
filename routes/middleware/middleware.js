const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

module.exports = {
    checkRegister: (req, res, next) => {
        const { firstName, lastName, email } = req.body
        if (!firstName || !lastName || !email){
            req.flash('errors', 'All fields are required')
            return res.redirect('/register')
        }
        next()
    },

    duplicateAccount: (req, res, next) => {
        User.findOne({email: req.body.email}).then(user => {
            if(user){
                req.flash('errors', 'An account with that email address already exists')
                return res.redirect('/register')
            }
            next()
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    // validateLoginInput: (req, res, next) => {
    //     const {username, password} = req.body
    //     if (!username || !password){
    //         req.flash('errors', 'All fields are required')
    //         return res.redirect('/api/v1/email-signup/login')
    //     }
        
    //     next()
    // },

    // checkZipCode: (req, res, next) => {
    //     if (req.body.zipCode.length !== 5){
    //         req.flash('errors', 'Invalid Zip Code')
    //         return res.redirect('/api/v1/email-signup/signup')
    //     }
    //     next()
    // },



    // checkPasswordFields: (req, res, next) => {
    //     const {
    //         tempPass, newPass, confirmNew
    //     } = req.body
    //     if (!tempPass || !newPass || !confirmNew){
    //         req.flash('errors', 'All fields are required')
    //         return res.redirect(`/api/v1/email-signup/set-password/${req.params.username}`)
    //     }
    //     next()
    // },

    // checkTemp: (req, res, next) => {
    //     User.findOne({username: req.params.username})
    //     .then(user => {
    //         bcrypt.compare(req.body.tempPass, user.password)
    //         .then(result => {
    //             if (result && user.tempPassword===true){
    //                 return next()
    //             }
    //             req.flash('errors', 'Invalid Temporary Password')
    //             return res.redirect(`/api/v1/email-signup/set-password/${req.params.username}`)
    //         }).catch(() => res.status(400).send('Server Error: Failed to validate temp password'))
    //     }).catch(() => res.status(400).send('Server Error: Failed to search for user in database'))
    // },

    // checkNewPass: (req, res, next) => {
    //     if (req.body.newPass !== req.body.confirmNew){
    //         req.flash('errors', "New passwords don't match")
    //         return res.redirect(`/api/v1/email-signup/set-password/${req.params.username}`)
    //     }
    //     if (req.body.newPass.length<3){
    //         req.flash('errors', 'Password must be at least 3 characters')
    //         return res.redirect(`/api/v1/email-signup/set-password/${req.params.username}`)
    //     }
    //     next()
    // }
}