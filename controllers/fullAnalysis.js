const googleSpeechText = require('./googleSpeechText.js')
const toneAnalyzer = require('./toneAnalyzer')
const personality = require('./personality')
const keyword = require('./keyword')

// require model

googleSpeechText().then((transcription) => {

	toneAnalyzer(transcription).then((data) => {
		let tone = data
	})
	personality(transcription).then((data) => {
		let person = data
	})
	keyword(transcription).then((data) => {
		let key = data
	})

	Promise.all([tone, person, key]).then((values) => {
		console.log('values',values);
		// model.create(json_data)
	})



})
