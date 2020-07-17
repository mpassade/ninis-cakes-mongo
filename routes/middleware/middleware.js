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

    checkPwds: (req, res, next) => {
        const { tempPass, newPass, confirmNew } = req.body
        if (!tempPass || !newPass || !confirmNew){
            req.flash('errors', 'All fields are required')
            return res.redirect(`/set-password/${req.params.id}`)
        }
        next()
    },

    checkTemp: (req, res, next) => {
        User.findOne({_id: req.params.id})
        .then(user => {
            bcrypt.compare(req.body.tempPass, user.password)
            .then(result => {
                if (result){
                    return next()
                }
                req.flash('errors', 'Invalid Temporary Password')
                return res.redirect(`/set-password/${req.params.id}`)
            }).catch(err => {
                return res.send(`Server Error: ${err}`)
            })
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    checkNewPwd: (req, res, next) => {
        if (req.body.newPass !== req.body.confirmNew){
            req.flash('errors', "New passwords don't match")
            return res.redirect(`/set-password/${req.params.id}`)
        }
        if (req.body.newPass.length<8 ||
            req.body.newPass.length>32 ||
            req.body.newPass.length){
            req.flash('errors', 'Password must be between 8 and 32 characters long. It must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.')
            return res.redirect(`/set-password/${req.params.id}`)
        }
        next()
    }

    // validateLoginInput: (req, res, next) => {
    //     const {username, password} = req.body
    //     if (!username || !password){
    //         req.flash('errors', 'All fields are required')
    //         return res.redirect('/api/v1/email-signup/login')
    //     }
        
    //     next()
    // },










}