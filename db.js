const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}, (err) => {
	if (err) {
		console.log('err', err);
	} else {
		console.log('Connected to MongoDB');
	}
})

module.exports = mongoose
