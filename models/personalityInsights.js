const db = require('../db')


const db_personality = db.model('personality', {
	processed_language: String,
	word_count: Number,
	word_count_message: String,
	personality: Array,
	needs: Array,
	values: Array,
	behavior: Array,
	consumption_preferences: Array,
	warnings: Array,
})

module.exports = db_personality
