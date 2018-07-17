const mongoose = require('mongoose')


const recipeSchema = mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
	ingredients: [{
		ingredient: String,
		quantity: Number,
		unit: String
	}],
	instructions: {
		type: String,
	},
})

module.exports = mongoose.model('Recipe', recipeSchema)