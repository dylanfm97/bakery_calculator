const Users = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
	retrieveUser: (req, res) => {
		Users.findById(req.params.id)
			.then(user => {
				res.json(user)
			})

	},
	createUser: (req, res) => {	
		let hash_password = bcrypt.hashSync(req.body.password, 8)

		Users.findOne({'email': req.body.email })
			.then(user => {
				if(user){
					res.status(422)
				}
			})

		Users.create({
			name: req.body.name,
			email: req.body.email,
			hashed_password: hash_password,

		})
			.then(user => res.json(user)) 
	},
	getUsers: (req, res) => {
		Users.find()
			.then(users => res.json(users))

	}

	

	
}