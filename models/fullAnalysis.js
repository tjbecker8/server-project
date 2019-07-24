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
	transcription: String
})

module.exports = db_fullAnalysis
