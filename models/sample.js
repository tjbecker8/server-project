const db = require('../db')


const db_hashtag = db.model('hashtag', {
	name: String
})

module.exports = db_hashtag
