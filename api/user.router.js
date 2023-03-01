const express = require('express')
const router = express.Router()
const {controllerGetUser, controllerAddUser, controllerLogin} = require('./user.controller')

router.get('/', controllerGetUser)
router.post('/', controllerAddUser)
router.post('/login', controllerLogin)

module.exports = router