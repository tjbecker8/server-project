const db_personality = require('../models/personalityInsights')

module.exports = (req, res) => {
	console.log('req',req.headers);
			db_personality.create(req.body).then((data) => {
				res.send(data)
			}).catch((err)=>{
				res.send(err)
			})
		}
