const express = require('express')
const router = express.Router()

const ingredientController = require('../controllers/ingredients')

//Prices/Ingredients
router.get('/', ingredientController.listIngredients)
router.post('/', ingredientController.createIngredient)

module.exports = router