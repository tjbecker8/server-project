const db = require('../db')


const db_keywords = db.model('keywords', {
	keywords: Array,
})

module.exports = db_keywords
