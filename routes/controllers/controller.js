const Cake = require('../models/cakeModel')

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
    }
}