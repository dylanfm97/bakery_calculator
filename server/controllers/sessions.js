const Sessions = require('../models/sessions')
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
	retrieveSession: (req, res, next) => {
		if("sessionId" in req.cookies){
			Sessions.findById(req.cookies.sessionId)
			.then(session => {
				if(session){
					//check if there is a user with this session id
					if(session.userId){
						User.findById(session.userId)
							.then(user => {
								if(user){
									req.user = user
									next()
								}
							})
					}
					else{
						//show the log in page

					}
				}
				else{
					//if they don't have a session, create one
					Sessions.create({
						userId: null
					})
						.then(session => {
					res.cookie("sessionId", session._id).send("Cookie is set")
			}) 
				}
			})
		} else{
			//if there is no session id cookie create it
			//give the cookie
			Sessions.create({
				userId: null
			})
			.then(session => {
				res.cookie("sessionId", session._id).send("Cookie is set")

			}) 
			//
			next()
			//
		}
		
	},
	createSession: (req, res) => {	
		//make sure the log in is legit
		User.find(req.body.email)
			.then(user => {
				if(user){
					let hash = user.hashed_password
					if(bcrypt.compareSync(req.body.password, hash)){
						req.user = user
						res.status(204).send()
					}
					else{
						//bad email or password
					}
				}
				else{
					//that email isn't in our database
					
					res.status(404).send()
				}
			})

	},

}