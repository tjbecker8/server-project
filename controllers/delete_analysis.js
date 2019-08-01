const db_fullAnalysis = require('../models/fullAnalysis')
const jwt = require('jsonwebtoken')



module.exports = (req, res) => {
	console.log('req',req.query);
	db_fullAnalysis.deleteMany(req.query).then((data) => {
		res.send(data)
	}).catch((err)=>{
		res.send(err)
	})
	}
