require('dotenv').config();
const _ = require('lodash');
const speech = require('@google-cloud/speech');
const cloudStorage = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const speechClient = new speech.SpeechClient();

// Functions

const audioToText = (audio) => {
	return new Promise(function(resolve, reject) {
		speechClient.longRunningRecognize(audio)
			.then((data) => {
				const operation = data[0];
				// The following Promise represents the final result of the job
				return operation.promise();
			})
			.then((data) => {
				const results = _.get(data[0], 'results', []);
				const transcription = results
					.map(result => result.alternatives[0].transcript)
					.join('\n');
				console.log(`Transcription: ${transcription}`);
				resolve(transcription)
			})
			.catch(err => {
				console.error('ERROR:', err);
				reject(err)
			});
	})
}

const uploadAudio = (projectId) => {
	return new Promise(function(resolve, reject) {
		const storage = cloudStorage({
			projectId: projectId,
		});

		const bucket = storage.bucket(bucketName);
		const fileName = path.basename(filePath);

		bucket.upload(filePath).then(() => {
			resolve(`gs://${bucketName}/${fileName}`)
		})
	})
}


module.exports = () => {
	return new Promise(function(resolve, reject) {

	  // The path to the audio file to transcribe
	  const filePath = './resources/CS.WAV';

	  // Google Cloud storage
	  const bucketName = 'tbeckproject'; // Must exist in your Cloud Storage

  // Upload to Cloud Storage first, then detects speech in the audio file
	uploadAudio(process.env.GOOGLE_CLOUD_PROJECT_ID).then(async (gcsUri) => {
			const audio = {
				uri: gcsUri,
			};

			const config = {
				encoding: "LINEAR16",
				sampleRateHertz: 16000,
				languageCode: 'en-US',
				enableAutomaticPunctuation: true,
			};

			const request = {
				audio,
				config,
			};

		})

		audioToText(request).then((text) => {
			console.log('text', text);
			resolve(text)
		})

	}) // end of Promise
}
