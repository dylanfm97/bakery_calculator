
import data from './data.js'
import api from './api.js'

const app = new Vue({
	el: "#app",
	data,
	methods: {
		my_recipes_onclick(){
			this.show_add_recipe_div = false
			this.show_my_recipes_div = true
			api.get_recipes().then(recipes => {
				this.my_recipes = recipes
			})
			this.show_edit_page = false
			
		},
		add_recipe_onclick(){
			this.show_add_recipe_div = true
			this.show_my_recipes_div = false
			this.current_ingredients = [{
				ingredient: "",
				quantity: "",
			}]
			this.current_recipe_name = ""
			this.current_instructions = ""
			//this.add_ingredient_onclick()
		},
		add_ingredient_onclick(is_editing){
			//this.current_ingredients++

			//this chunk of code should only occur if the current text boxes inthe form are VALID

			
			let new_ingredient = {
				ingredient: "",
				price: "",
				description: "",
				unit: ""
			}

			if(!is_editing){
				this.current_ingredients.push(new_ingredient)
			} else {
				this.current_editing_recipe.ingredients.push(new_ingredient)
			}

		},
		save_recipe_onclick(){
			api.add_recipe(this.current_recipe_name, this.current_ingredients, this.current_instructions)
			this.current_instructions = ''
			this.current_ingredients = [{
				ingredient: "",
				quantity: 0,
			}]
			this.current_recipe_name = ''
		},
		delete_recipe(recipe){
			api.delete_recipe(recipe._id)
				.then(this.my_recipes.splice(this.my_recipes.indexOf(recipe), 1))
			this.show_individual_recipe_page = false
		},
		edit_recipe(recipe){
			this.show_individual_recipe_page = false
			this.show_edit_page = true

			this.current_editing_recipe = recipe
			this.editing_id = recipe._id

			this.current_instructions = recipe.instructions
			this.current_ingredients = recipe.ingredients
			this.current_recipe_name = recipe.name
		},
		update_recipe(){
			api.update_recipe(this.current_recipe_name, 
				this.current_ingredients, 
				this.current_instructions,
				this.editing_id)
				.then(() => {
					this.show_edit_page = false
					this.current_instructions = ''
					this.current_ingredients = [{
						ingredient: "",
						quantity: 0,
					}]
					this.current_recipe_name = ''
					this.current_editing_recipe = null
					this.editing_id = null
				})
		},
		delete_this_row(index){
			this.current_ingredients.splice(index, 1)
		},
		delete_this_editing_row(index){
			this.current_editing_recipe.ingredients.splice(index, 1)
		},
		individual_recipe(recipe){
			this.show_individual_recipe_page = true
			this.current_editing_recipe = recipe
		}
	}
})