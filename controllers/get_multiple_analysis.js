const db_fullAnalysis = require('../models/fullAnalysis')
const jwt = require('jsonwebtoken')



module.exports = (req, res) => {

	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) =>{
		if (decoded) {
			console.log(decoded._id);
			let author = decoded._id


	db_fullAnalysis.find({author: decoded._id}).sort('date').populate({
		path: 'author',
		select: 'name email'
	}).then((data) => {
		res.send(data)
	}).catch((err)=>{
		res.send(err)
	})
	}
})

}
