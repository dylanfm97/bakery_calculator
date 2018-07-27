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
									//I am logged in
									req.user = user
									console.log(user)
									next()
								}
								else{

									//the user that they say they are is not in our table
									res.status(401).send("Not authenticated")
								}
								
							})
					}
					else{
						
						//I have a session, but I'm not logged in
						res.status(401).send("Not authenticated")
						next()
						//show the log in page
						// next()
					}
				}
				else{
					//if they don't have a session, create one
					
					Sessions.create({
						userId: null
					})
						.then(session => {
							res.cookie("sessionId", session._id)//.send("Cookie is set")
							res.status(401).send("Not authenticated")
							// next()
						}) 

						
				}
			})
		} 
		else{
			console.log("here")
			//if there is no session id cookie create it
			//give the cookie
			Sessions.create({
				userId: null
			})
			.then(session => {
				//console.log("Am I making it to this part right here?")
				// res.cookie('hi', 'mom')
				res.cookie("sessionId", session._id)//.send("Cookie is set")
				res.status(401).send("Not authenticated")
				//next()

			}) 
			//
			
			//
		}
		
	},
	createSession: (req, res) => {	
		//make sure the log in is legit


		console.log("Am I making it this far?")


		User.findOne({'email': req.body.email })
			.then(user => {
				
				if(user){
					let hash = user.hashed_password
					console.log("trying to log in")
					console.log(req.body.password)
					console.log(hash)

					if(bcrypt.compareSync(req.body.password, hash)){
						req.user = user
						
						Sessions.findById(req.cookies.sessionId)
							.then(session =>  {
								
								session.userId = user._id
								console.log("session userid")
								console.log(session.userId)
								session.save()
								console.log(user)
								
								res.status(200)
								res.json(user)
							})
							
						
						
					}
					else{
						//bad email or password
					}
				}
				
				else{
					//that email isn't in our database
					console.log("It's Nothing")
					res.status(401)
					res.json(user)
				}
			})

	}


}