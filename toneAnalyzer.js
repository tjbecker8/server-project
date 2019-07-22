require('dotenv').config();
// Use our Watson library.
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// const googleSpeechText = require('./googleSpeechText.js')

module.exports = (transcription) => {

	return new Promise(function(resolve, reject) {

		// Turn our text into valid json.
		const input = { "text": transcription };

		// The format that the tone analyzer needs.
		const params =
						{
						'tone_input': input,
						'content_type': 'application/json',
						'sentences': false
						};

		// Initialize the Tone Analyzer by giving it our credentials.
		const toneAnalyzer = new ToneAnalyzerV3({
			version: '2017-09-21',
			iam_apikey: process.env.TONE_KEY,
		});



		// Use our Tone Analyzer variable to analyze the tone.
		toneAnalyzer.tone(params)
			.then(toneAnalysis => {
				// console.log('tone', JSON.stringify(toneAnalysis, null, 2));
				resolve(toneAnalysis)
			})
			.catch(err => {
				console.log('error:', err);
				reject(err)
			});

	})



}
