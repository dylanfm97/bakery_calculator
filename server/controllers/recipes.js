const Recipe = require('../models/recipes')

module.exports = {

	listRecipes: (req, res) => {
		Recipe.find()
			.then(recipes => res.json(recipes))
		//res.json("You issued a GET request")

	},

	createRecipe: (req, res) => {
		
		Recipe.create({
			name: req.body.name,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions,
			servings: req.body.servings
		})
			.then(recipe => res.status(201).json(recipe)) 
	},

	deleteRecipe: (req, res) => {
		Recipe.findByIdAndRemove(req.params.id)
			.then(() => res.status(204).send())
	},

	updateRecipe: (req, res) => {
		Recipe.findById(req.params.id)
			.then(recipe => {
				if (recipe == null) {
					res.status(404).send()
					return
				}
				recipe.name = req.body.name
				recipe.ingredients = req.body.ingredients
				recipe.instructions = req.body.instructions
				recipe.servings = req.body.servings
				return recipe.save()

			})
				.then(recipe => res.json(recipe))
	}

	
}