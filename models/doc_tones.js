const db = require('../db')


const db_tones = db.model('tones', {
	document_tone: Object,
})

module.exports = db_tones
