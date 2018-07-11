
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
		},
		add_recipe_onclick(){
			this.show_add_recipe_div = true
			this.show_my_recipes_div = false
			//this.add_ingredient_onclick()
		},
		add_ingredient_onclick(){
			//this.current_ingredients++

			//this chunk of code should only occur if the current text boxes inthe form are VALID


			let new_ingredient = {
				ingredient: "",
				price: "",
				description: "",
			}

			this.current_ingredients.push(new_ingredient)


		},
		save_recipe_onclick(){
			api.add_recipe(this.current_recipe_name, this.current_ingredients)
		}
	}
})