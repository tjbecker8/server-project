const db_user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	db_user.findOne({
		email: req.body.email
	}).then((user)=>{
		if(user) {
			return console.log('email is already in use');
		} else {
			bcrypt.hash(req.body.password, 10, (err, encrypted) => {
				if (err) {
					res.status(300).send('error', err)
				} else {
					req.body.password = encrypted
					db_user.create(req.body).then((user) => {
						let token =jwt.sign(user.toObject(), process.env.SECRET) //thats your token
						res.status(200).json({
							message: 'you are logged in',
							token: token
						})
					}).catch((err)=>{
						res.send(err)
					})
				}
			})
		}
	})

	// bcrypt.hash(req.body.password, 10, (err, encrypted) => {
	// 	if (err) {
	// 		res.status(300).send('error', err)
	// 	} else {
	// 		req.body.password = encrypted
	// 		db_user.create(req.body).then((user) => {
	// 			let token =jwt.sign(user.toObject(), process.env.SECRET) //thats your token
	// 			res.status(200).json({
	// 				message: 'you are logged in',
	// 				token: token
	// 			})
	// 		}).catch((err)=>{
	// 			res.send(err)
	// 		})
	// 	}
	// })
}
