const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
    home, getRegister, getLogin, getSetPwd, logout,
    getProfile, register, setPwd
} = require('./controllers/controller')

const {
    checkRegister, duplicateAccount, checkPwds, checkTemp,
    checkNewPwd, checkLogin
} = require('./middleware/middleware')

router.get('/', home)
router.get('/register', getRegister)
router.get('/login', getLogin)
router.get('/set-password/:id', getSetPwd)
router.get('/logout', logout)
router.get('/profile', getProfile)
router.post(
    '/register',
    checkRegister,
    duplicateAccount,
    register
)
router.post(
    '/login',
    checkLogin,
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))
router.put(
    '/set-password/:id',
    checkPwds,
    checkTemp,
    checkNewPwd,
    setPwd
)

module.exports = router