const data = {
	show_my_recipes_div: true,
	show_add_recipe_div: false,
	current_ingredients: [{
		ingredient: "",
		quantity: "",
		unit: ""
	}],
	current_index: 0,
	current_recipe_name: '',
	current_instructions: '',
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
	stuff: [
		"eggs",
		"tomatoes",
		"potatoes",
		"rice",
		"beans",
		"salsa",
		"flour",
		"sugar",
		"salt"
	],
	show_individual_recipe_page: false,
	

}

export default data