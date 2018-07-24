const Ingredient = require('../models/ingredients')

module.exports = {

	listIngredients: (req, res) => {
		Ingredient.find()
			.then(ingredients => res.json(ingredients))
		//res.json("You issued a GET request")

	},

	createIngredient: (req, res) => {
		
		Ingredient.create({
			name: req.body.name,
			price_per_unit: req.body.price_per_unit,
			cup: req.body.cup,
			tbsp: req.body.tbsp,
			tsp: req.body.tsp,
		})
			.then(ingredient => res.status(201).json(ingredient)) 
	},

	updateIngredient: (req, res) => {
		Ingredient.findById(req.params.id)
			.then(ingredient => {
				if (ingredient == null) {
					res.status(404).send()
					return
				}
				ingredient.name = req.body.name
				ingredient.price_per_unit = req.body.price_per_unit
				ingredient.cup = req.body.cup
				ingredient.tbsp = req.body.tbsp
				ingredient.tsp = req.body.tsp
				return ingredient.save()
			})
				.then(ingredient => res.json(ingredient))
	}

	

	
}