const express = require('express')
const router = express.Router()

const cookieController = require('../controllers/cookies')

router.get('/', cookieController.sendCookie)

module.exports = router