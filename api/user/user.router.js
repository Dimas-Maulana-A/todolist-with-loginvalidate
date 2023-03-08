const express = require('express')
const router = express.Router()
const {controllerGetUser, controllerAddUser, controllerLogin, controllerGetToken} = require('./user.controller')
const Auth = require('./../../middleware/auth')

router.get('/', Auth, controllerGetUser)
router.post('/', controllerAddUser)
router.post('/login', controllerLogin)
router.get('/token', controllerGetToken)

module.exports = router