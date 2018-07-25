const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sessions = require('./controllers/sessions')

var cookieParser = require('cookie-parser')
const app = express()

const recipesRouter = require('./routes/recipes')
const ingredientsRouter = require('./routes/ingredients')
const cookieRouter = require('./routes/cookies')
const usersRouter = require('./routes/users')
const sessionsRouter = require('./routes/sessions')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cookieParser())

app.use(sessions.retrieveSession)

//namespacing so the new root is /recipes
app.use(express.static(`${__dirname}/../client`))
app.use('/recipes', recipesRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/cookie', cookieRouter)
app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)


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

	