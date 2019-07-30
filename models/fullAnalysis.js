const db = require('../db')
const mongoose = require('mongoose')

const db_fullAnalysis = db.model('fullAnalysis', {
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, 'Message Author is required']
	},
	document_tone: {},
	word_count: Number,
	personality: [],
	values: [],
	consumption_preferences: [],
	warnings: [],
	keywords: [],
	name: String,
	transcription: String,
	date: {
		type: Date,
		default: Date.now()
	}
})

module.exports = db_fullAnalysis
