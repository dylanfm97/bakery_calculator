const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({

	
	userId: {
		type: String,
		required: false,
	}

})

module.exports = mongoose.model('sessions', sessionSchema)