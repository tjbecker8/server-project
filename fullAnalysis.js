const googleSpeechText = require('./googleSpeechText.js')
const toneAnalyzer = require('./toneAnalyzer')
const personality = require('./personality')
const keyword = require('./keyword')

// require model
module.exports=(req, res)=>{
googleSpeechText().then((transcription) => {

	const tone = new Promise(function(resolve, reject) {
		toneAnalyzer(transcription).then((data) => {
			resolve(data)
		}).catch(err => {
			reject(err)
		});
	})

	const person = new Promise(function(resolve, reject) {
		personality(transcription).then((data) => {
			resolve(data)
		}).catch(err => {
			reject(err)
		});
	})


	const key = new Promise(function(resolve, reject) {
		keyword(transcription).then((data) => {
			resolve(data)
		}).catch(err => {
			reject(err)
		});
	})

	Promise.all([tone, person, key]).then((values) => {
		console.log('values',values);
		res.json(values)
		// model.create(json_data)
	}).catch(err => {
		console.error('ERROR:', err);
	});

})
}
