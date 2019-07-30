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


// module.exports = (req, res) => {
// // console.log(req.query);
// 	let q = {}
// 	if (req.query && req.query.channel) {
// 		q.channel = req.query.channel
// 	}
// 	db_message.find(q).populate({
// 		path: 'channel',
// 		select: 'channelName'
// 	}).populate({
// 		path: 'author',
// 		select: 'email name'
// 	}).sort('-date').then((data) => {
// 		res.send(data)
// 	}).catch((err)=>{
// 		res.send(err)
// 	})
// }
