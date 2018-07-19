const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const recipesRouter = require('./routes/recipes')
const ingredientsRouter = require('./routes/ingredients')

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../client`))
app.use(morgan('tiny'))

//namespacing so the new root is /recipes
app.use('/recipes', recipesRouter)
app.use('/ingredients', ingredientsRouter)

app.use((req, res, next) => {
	if(req.error){
		switch(req.error.name) {
			case 'ValidationError':
				res.status(422).json({
					message: req.error.message
				})
			break
			default:
				res.status(500).send()
		}
	} else {
		res.status(404).send()
	}
})

mongoose.connect('mongodb://dylan:wildflower7@ds023520.mlab.com:23520/cook_book', { useNewUrlParser: true })
.then(() => {
	app.listen(3000)
})

	