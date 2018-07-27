const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

//Prices/Ingredients
router.get('/', usersController.getUsers)

router.get('/:id', usersController.retrieveUser)
router.post('/', usersController.createUser)



module.exports = router