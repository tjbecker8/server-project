const db_fullAnalysis = require('../models/fullAnalysis')

module.exports = (req, res) => {

	let q = {}
	if (req.query && req.query._id) {
		q._id = req.query._id
	}

	db_fullAnalysis.find(q).sort('date').populate({
		path: 'author',
		select: 'name email'
	}).then((data) => {
		res.send(data)
	}).catch((err)=>{
		res.send(err)
	})
}
