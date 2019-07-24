const db_fullAnalysis = require('../models/fullAnalysis')

module.exports = (req, res) => {
	db_fullAnalysis.find({}).then((data) => {
		res.send(data)
	}).catch((err)=>{
		res.send(err)
	})
}
