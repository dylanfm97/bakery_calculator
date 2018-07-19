const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipes')
const ingredientController = require('../controllers/ingredients')


//COLLECTION PATHS
//for Recipes
router.get('/', recipeController.listRecipes)
router.post('/', recipeController.createRecipe)

router.delete('/:id', recipeController.deleteRecipe)
router.put('/:id', recipeController.updateRecipe)

//Prices/Ingredients
router.get('/', ingredientController.listIngredients)
router.post('/', ingredientController.createIngredient)



module.exports = router