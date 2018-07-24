const data = {
	show_my_recipes_div: true,
	show_add_recipe_div: false,
	current_ingredients: [{
		ingredient: "",
		quantity: "",
		unit: "",
		servings: "",
	}],
	current_index: 0,
	current_recipe_name: '',
	current_instructions: '',
	current_servings: '',
	my_recipes: {},
	show_edit_page: false,
	current_editing_recipe: null,
	editing_id: null,
	units: [
		"cups",
		"Tbsp",
		"tsp",
		"pinch",
		"item",
	],
	stuff: [],
	ingredients_names: [],
	show_individual_recipe_page: false,
	valid: {
		recipe_name: true,
		ingredients: true,
		quantity: true,
		unit: true,
		instructions: true,
		servings: true
	},
	invalid_message: {
		message: "",
		name: false,
		ingredient: false,
		quantity: false,
		unit: false,
		instructions: false,
		servings: false


	},
	recipe_is_valid: true,
	

}

export default data