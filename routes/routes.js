const express = require('express')
const router = express.Router()

const {
    home, getRegister, getSetPwd, register, setPwd
} = require('./controllers/controller')

const {
    checkRegister, duplicateAccount, checkPwds, checkTemp
} = require('./middleware/middleware')

router.get('/', home)
router.get('/register', getRegister)
router.get('/set-password/:id', getSetPwd)
router.post(
    '/register',
    checkRegister,
    duplicateAccount,
    register
)
router.put(
    '/set-password/:id',
    checkPwds,
    checkTemp,
    setPwd
)

module.exports = router