const googleSpeechText = require('./googleSpeechText.js')
const toneAnalyzer = require('./toneAnalyzer')
const personality = require('./personality')
const keyword = require('./keyword')
const db_fullAnalysis = require('./models/fullAnalysis')
const fs = require('fs');
const path = require('path');



const deleteFile = (filePath) => {
	fs.access(filePath, error => {
		if (!error) {
			fs.unlink(filePath, (error) => {
				// console.log(error);
			})
		} else {
			console.log('error',error);
    }
})
}

// require model
module.exports=(req, res)=>{
	console.log('Starting Analysis');
// console.log('body',req.body.name);
	// console.log('5656', req.file.path);
	googleSpeechText(req.file).then((transcription) => {


		const tone = new Promise(function(resolve, reject) {
			toneAnalyzer(transcription).then((data) => {
				resolve(data)
			}).catch(err => {
				reject(err)
			});
			// resolve(toneAnalyzer(transcription))
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
			// console.log('values',values);
			res.json(values)
			// db_tones.create(values[0])
			// db_personality.create(values[1])
			// db_keywords.create(values[2])
			// .create(json_data)
			let document = {
				document_tone: values[0].document_tone,
				word_count: values[1].word_count,
				processed_language: values[1].processed_language,
				personality: values[1].personality,
				values: values[1].values,
				consumption_preferences: values[1].consumption_preferences,
				warnings: values[1].warnings,
				keywords: values[2].keywords,
				name: req.body.name,
				transcription: transcription
			}

			db_fullAnalysis.create(document).then((data) => {
				res.json(data)
				console.log('Analysis Complete');
			})
		}).catch(err => {
			console.error('ERROR:', err);
		})

	}).catch(err => {
		// console.log('£££££ err', err);
	})
	setTimeout(deleteFile, 45000, `./${req.file.path}`)


}
