const mongoose = require('mongoose')


const ingredientSchema = mongoose.Schema({

	name: {
		type: String,
		required: true,
	},
	price_per_unit: {
		type: Number,
		required: true,
	},
	cup: {
		type: Number,
		required: true,
	},
	tbsp: {
		type: Number,
		required: true,
	},
	tsp: {
		type: Number,
		required: true
	}


	
})



module.exports = mongoose.model('Ingredient', ingredientSchema)