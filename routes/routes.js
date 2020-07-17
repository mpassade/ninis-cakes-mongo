const express = require('express')
const router = express.Router()

const {
    home, getRegister, register
} = require('./controllers/controller')

const {
    checkRegister, duplicateAccount
} = require('./middleware/middleware')

router.get('/', home)
router.get('/register', getRegister)
router.post(
    '/register',
    checkRegister,
    duplicateAccount,
    register
)

module.exports = router