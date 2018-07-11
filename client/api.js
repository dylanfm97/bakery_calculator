

const add_recipe = (recipe_name, recipe) => {
	return new Promise((resolve, reject) => {
		let parsed_recipe = JSON.stringify(recipe)
		localStorage.setItem(recipe_name, parsed_recipe)
	})
}

const get_recipes = () => {
	return new Promise((resolve, reject) => {
		var my_recipes = {}
		for(var recipe in localStorage){
			if(localStorage.hasOwnProperty(recipe)){
				let this_recipe = localStorage.getItem(recipe)
				if(recipe)
					my_recipes[recipe] = this_recipe
			}
		}
		resolve(my_recipes)
	})
}

export default{
	add_recipe,
	get_recipes
}