const Cake = require('../models/cakeModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const mailjet = require ('node-mailjet')
.connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)
const nanoid = require('nanoid').nanoid

module.exports = {
    home: (req, res) => {
        Cake.find().then(cakes => {
            return res.render('main/home', {cakes})
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    getRegister: (req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        return res.render('main/register')
    },

    register: (req, res) => {
        const temp = nanoid()
        const newUser = new User()
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(temp, salt)

        newUser.firstName = req.body.firstName
        newUser.lastName = req.body.lastName
        newUser.email = req.body.email
        newUser.password = hash

        newUser.save().then(user => {
            mailjet.post("send", {'version': 'v3.1'}).request({
                "Messages":[
                    {
                        "From": {
                            "Email": "michael.passade@codeimmersives.com",
                            "Name": "Nini"
                        },
                        "To": [
                            {
                                "Email": user.email,
                                "Name": `${user.firstName} ${user.lastName}`
                            }
                        ],
                        "Subject": "Welcome to Nini's Cakes!",
                        "TextPart": "Sign-up Email",
                        "HTMLPart": `<p>Hi ${user.firstName},</p><p>Please click the below link and use the following temporary password to set a new password and complete your registration.</p><p>Temporary Password: ${temp}</p><a href='http://localhost:3000/set-password/${user._id}'>Complete Registration</a>`,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            })
            return res.render('main/registered')
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    getSetPwd: (req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        User.findOne({_id: req.params.id})
        .then(user => {
            if (user){
                if(user.tempPassword){
                    return res.render('main/set-password', {user})
                }
            }
            return res.redirect('/')
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    setPwd: (req, res) => {
        User.findOne({_id: req.params.id})
        .then(user => {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.newPass, salt)
            user.password = hash
            user.tempPassword = false
            user.save().then(() => {
                return res.render('main/pwd-set')
            }).catch(err => {
                return res.send(`Server Error: ${err}`)
            })
        }).catch(err => {
            return res.send(`Server Error: ${err}`)
        })
    },

    getLogin: (req, res) => {
        if (req.isAuthenticated()){
            return res.redirect('/')
        }
        return res.render('main/login')
    },

    logout: (req, res) => {
        req.logout()
        req.session.destroy()
        return res.redirect('/login')
    },

    getProfile: (req, res) => {
        if (req.isAuthenticated()){
            return res.render('main/profile')
        }
        return res.redirect('/')
    }
}