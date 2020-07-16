const express = require('express')
const router = express.Router()
const {
    home, getRegister
} = require('./controllers/controller')

router.get('/', home)
router.get('/register', getRegister)

module.exports = router