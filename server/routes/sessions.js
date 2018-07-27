const express = require('express')
const router = express.Router()

const sessionsController = require('../controllers/sessions')

//Prices/Ingredients
// router.get('/', sessionsController.retrieveSession)
router.post('/', sessionsController.createSession)




module.exports = router