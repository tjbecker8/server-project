const googleSpeechText = require('./googleSpeechText.js')
const toneAnalyzer = require('./toneAnalyzer')
const personality = require('./personality')
const keyword = require('./keyword')
const db_fullAnalysis = require('./models/fullAnalysis')
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
const uuidv1 = require('uuid/v1');



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

	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) =>{
		if (decoded) {
			// console.log('decoded');
	googleSpeechText(req.file).then((transcription) => {
		// console.log('google success');


		const tone = new Promise(function(resolve, reject) {
			toneAnalyzer(transcription).then((data) => {
				// console.log('tone success');
				resolve(data)
			}).catch(err => {
				reject(err)
			});
			// resolve(toneAnalyzer(transcription))
		})

		const person = new Promise(function(resolve, reject) {
			personality(transcription).then((data) => {
				// console.log('person success');
				resolve(data)
			}).catch(err => {
				reject(err)
			});
		})


		const key = new Promise(function(resolve, reject) {
			keyword(transcription).then((data) => {
				// console.log('key success');
				resolve(data)
			}).catch(err => {
				reject(err)
			});
		})

		Promise.all([tone, person, key]).then((values) => {
			console.log('all success');
			let document = {
				author: decoded._id,
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
				console.log('Analysis Complete');
				deleteFile(`./${req.file.path}`)
				console.log('res data', data);
				res.json({
					message: 'itz works',
					data: data
				})
			}).catch((err) => {
				console.error('ERROR db_fullAnalysis:', err);
				res.send(err)
			})
		}).catch((err) => {
			console.error('ERROR Promise.all:', err);
			res.send(err)
		})

	}).catch(err => {
		// console.log('£££££ err', err);
		res.send(err)
	})
}
else {
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
				console.log('Analysis Complete');
				deleteFile(`./${req.file.path}`)


				res.send(data)
			}).catch((err) => {
				console.error('ERROR db_fullAnalysis:', err);
			})
		}).catch((err) => {
			console.error('ERROR Promise.all:', err);
		})

	}).catch(err => {
		// console.log('£££££ err', err);
	})

}
})
}
