
import data from './data.js'
import api from './api.js'

const app = new Vue({
	el: "#app",
	data,
	created() {
		api.get_ingredients().then(ingredients => {
				this.stuff = ingredients
				for(var i in this.stuff){
					this.ingredients_names.push(this.stuff[i].name)
				}
			})
	},
	computed: {
		wholesale(){
			let total = 0
			for(var i in this.current_editing_recipe.ingredients){
			//	console.log(this.current_editing_recipe)
				let name = this.current_editing_recipe.ingredients[i].ingredient
			//	console.log("name: "+name)
				let unit = this.current_editing_recipe.ingredients[i].unit
			//	console.log("unit: "+unit)
				let quantity = this.current_editing_recipe.ingredients[i].quantity
			//	console.log("quantity: "+quantity)
				let price_per_unit = 0
				for(var j in this.stuff){
					
					if(this.stuff[j].name == name){
						price_per_unit = this.stuff[j].price_per_unit
						if(unit == "cups"){
							price_per_unit *= this.stuff[j].cup
						}
						else if(unit == "tbsp"){
							price_per_unit *= (this.stuff[j].cup / 16)
						}
						else if(unit == "tsp"){
							price_per_unit *= (this.stuff[j].cup / 48)
						}
						else if(unit == "pinch"){
							price_per_unit *= (this.stuff[j].cup / 96)
						}
					}	
				}
				total += quantity*price_per_unit
			}
			return total
		},
	},
	methods: {
		my_recipes_onclick(){
			this.show_add_recipe_div = false
			this.show_my_recipes_div = true
			api.get_recipes().then(recipes => {
				this.my_recipes = recipes
			})
			this.show_edit_page = false
			this.show_individual_recipe_page = false
			
		},
		add_recipe_onclick(){
			this.show_add_recipe_div = true
			this.show_my_recipes_div = false
			this.show_edit_page = false
			this.show_individual_recipe_page = false
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
			if(this.validate_ingredients()){
				let new_ingredient = {
					ingredient: "",
					description: "",
					unit: ""
				}

				if(!is_editing){
					this.current_ingredients.push(new_ingredient)
				} else {
					this.current_editing_recipe.ingredients.push(new_ingredient)
				}

				this.invalid_message.ingredient = false
				this.invalid_message.quantity = false
				this.invalid_message.unit = false
			}
			

		},
		save_recipe_onclick(){
			if(this.is_valid()){
				api.add_recipe(this.current_recipe_name, this.current_ingredients, this.current_instructions, this.current_servings)
					.then(recipe => {
						this.current_editing_recipe = recipe
						this.show_individual_recipe_page = true
						this.show_add_recipe_div = false
					})
				this.current_instructions = ''
				this.current_ingredients = [{
					ingredient: "",
					quantity: 0,
				}]
				this.current_recipe_name = ''
				this.current_servings = ''
			}
			else{
			
			}

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
			if(this.is_valid()){
				api.update_recipe(this.current_recipe_name, 
					this.current_ingredients, 
					this.current_instructions,
					this.current_servings,
					this.editing_id)
					.then(recipe => {
						this.show_edit_page = false
						this.current_instructions = ''
						this.current_ingredients = [{
							ingredient: "",
							quantity: 0,
						}]
						this.current_recipe_name = ''
						this.current_servings = ""
						this.current_editing_recipe = recipe
						this.show_individual_recipe_page = true
						this.editing_id = null
					})
			}
		},
		delete_this_row(index){
			if(this.current_ingredients.length > 1){
				this.current_ingredients.splice(index, 1)
			}
			else{
				this.current_ingredients[0].ingredient = ""
				this.current_ingredients[0].quantity = ""
				this.current_ingredients[0].unit = ""
			}
		},
		delete_this_editing_row(index){
			if(this.current_ingredients.length > 1){
				this.current_editing_recipe.ingredients.splice(index, 1)
			}
			else{
				this.current_ingredients[0].description = ""
				this.current_ingredients[0].ingredient = ""
				this.current_ingredients[0].unit = ""
			}
		},
		individual_recipe(recipe){
			this.show_individual_recipe_page = true
			this.current_editing_recipe = recipe
			this.show_my_recipes_div = false

		},
		go_back(){
			this.show_individual_recipe_page = false
			this.show_my_recipes_div = true
		},
		validate_recipe_name(){
			if(!Boolean(this.current_recipe_name)){
				this.invalid_message.message = "Please enter a name for the recipe"
				this.invalid_message.name = true
				this.recipe_is_valid = false
				return false
			}
			else{				
				
				this.recipe_is_valid = true
				return true
			}
		},
		validate_ingredients(){
			for(var i in this.current_ingredients){
				if(!Boolean(this.current_ingredients[i].ingredient) || (this.ingredients_names.indexOf(this.current_ingredients[i].ingredient) == -1)){
					//if ingredient
					this.invalid_message.ingredient = true
					this.recipe_is_valid = false
					return false
				}
			}
			return true
		},
		validate_quantity(){
			for(var i in this.current_ingredients){
				if(!Boolean(Number(this.current_ingredients[i].quantity))){
					//quantity
					this.invalid_message.quantity = true
					this.recipe_is_valid = false
					return false
				}
			}
			return true
		},
		validate_unit(){
			for(var i in this.current_ingredients){
				if(!Boolean(this.current_ingredients[i].unit) || (this.units.indexOf(this.current_ingredients[i].unit) == -1)){
					//unit
					this.invalid_message.unit = true
					this.recipe_is_valid = false
					return false
				}
			}
			return true
		},
		validate_servings(){
			if (!Boolean(Number(this.current_servings))){
				this.invalid_message.servings =true
				this.recipe_is_valid = false
				return false
			}
			else{
				this.recipe_is_valid = true
				return true
			}
		},
		validate_instructions(){
			if(!Boolean(this.current_instructions)){
				this.invalid_message.instructions = true
				this.recipe_is_valid = false
				return false
			}
			else {
				
				this.recipe_is_valid = true
				return true
			}
		},
		is_valid(){
			this.recipe_is_valid = true
			this.invalid_message = {
				message: "",
				name: false,
				ingredient: false,
				quantity: false,
				unit: false,
				instructions: false,
				servings: false
			}
			this.valid = {
				ingredients: this.validate_ingredients(),
				quantity: this.validate_quantity(),
				unit: this.validate_unit(),
				instructions: this.validate_instructions(),
				recipe_name: this.validate_recipe_name(),
				servings: this.validate_servings()
			}
			console.log(this.valid)
			for(var key in this.valid){
				
				if(!this.valid[key]){

					return false
				}
			}
			this.invalid_message = ""
			console.log("you are VALID")
			return true
		}
	}
})