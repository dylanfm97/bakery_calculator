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
	servings: {
		type:Number,
	},
	instructions: {
		type: String,
	},
})



module.exports = mongoose.model('Recipe', recipeSchema)