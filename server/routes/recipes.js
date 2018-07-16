const express = require('express')
const router = express.Router()

const recipeController = require('../controllers/recipes')

//COLLECTION PATHS

router.get('/', recipeController.listRecipes)
router.post('/', recipeController.createRecipe)

router.delete('/:id', recipeController.deleteRecipe)
router.put('/:id', recipeController.updateRecipe)

module.exports = router