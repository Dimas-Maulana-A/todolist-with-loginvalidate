const express = require('express')
const router = express.Router()
const {controllerGetUser, controllerAddUser, controllerLogin} = require('./user.controller')
const Auth = require('./../../middleware/auth')

router.get('/', Auth, controllerGetUser)
router.post('/', Auth, controllerAddUser)
router.post('/login', controllerLogin)

module.exports = router