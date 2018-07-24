const express = require('express')
const router = express.Router()

const ingredientController = require('../controllers/ingredients')

//Prices/Ingredients
router.get('/', ingredientController.listIngredients)
router.post('/', ingredientController.createIngredient)

router.put('/:id', ingredientController.updateIngredient)

module.exports = router