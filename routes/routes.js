const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
    home, getRegister, getLogin, getSetPwd, logout,
    getProfile, getEdit, register, setPwd, editProfile,
    verifyEmail, getChangePwd, changePwd
} = require('./controllers/controller')

const {
    checkRegister, duplicateAccount, checkPwds, checkTemp,
    checkNewPwd, checkLogin, checkEdit, checkPwds2, checkOld,
    checkNewPwd2
} = require('./middleware/middleware')

router.get('/', home)
router.get('/register', getRegister)
router.get('/login', getLogin)
router.get('/set-password/:id', getSetPwd)
router.get('/logout', logout)
router.get('/profile', getProfile)
router.get('/edit-profile/:id', getEdit)
router.get('/change-password/:id', getChangePwd)
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
router.put(
    '/change-password/:id',
    checkPwds2,
    checkOld,
    checkNewPwd2,
    changePwd
)
router.put(
    '/edit-profile/:id',
    checkEdit,
    editProfile
)
router.put('/verify-email/:id/:email/:key', verifyEmail)

module.exports = router