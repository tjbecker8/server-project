const db = require('../db')


const db_fullAnalysis = db.model('fullAnalysis', {
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
