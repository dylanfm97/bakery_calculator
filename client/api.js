

const add_recipe = (recipe_name, ingredients, instructions) => {
	return new Promise((resolve, reject) => {
		//let parsed_recipe = JSON.stringify(recipe)
		
		fetch('/recipes', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',				
			},
			body: JSON.stringify({
				'name': recipe_name,
				'ingredients': ingredients,
				'instructions': instructions,
			})
		})
			.then(res => res.json())
			//.then(console.log("it happened"))
	})
}

const get_recipes = () => {
	return new Promise((resolve, reject) => {
		
		fetch('/recipes')
			.then(res => res.json())
			.then(recipes => resolve(recipes))

	})
}

const delete_recipe = (id) => {
	return new Promise((resolve, reject) => {
		fetch('/recipes/'+id, {
			method: 'DELETE',
		})
			.then(console.log('it happened'))


	})
}

const update_recipe = (recipe_name, ingredients, instructions, id) => {
	return new Promise((resolve, reject) => {
		fetch('/recipes/'+id, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				'name': recipe_name,
				'ingredients': ingredients,
				'instructions': instructions
			})
		})
			.then(res => res.json())


	})
}

export default{
	add_recipe,
	get_recipes,
	delete_recipe,
	update_recipe
}