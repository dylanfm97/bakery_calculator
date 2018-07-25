const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({

	sessionId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: false,
	}

})

module.exports = mongoose.model('sessions', sessionSchema)