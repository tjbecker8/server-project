require('dotenv').config();


  const _ = require('lodash');
  const speech = require('@google-cloud/speech');
  const cloudStorage = require('@google-cloud/storage');
  const fs = require('fs');
  const path = require('path');

  const speechClient = new speech.SpeechClient();

  // The path to the audio file to transcribe
  const filePath = './resources/CS.WAV';

  // Google Cloud storage
  const bucketName = 'tbeckproject'; // Must exist in your Cloud Storage

  const uploadToGcs = async () => {
    const storage = cloudStorage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(filePath);

    await bucket.upload(filePath);

    return `gs://${bucketName}/${fileName}`;
  };

  // Upload to Cloud Storage first, then detects speech in the audio file
  uploadToGcs()
    .then(async (gcsUri) => {
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

			return new Promise(function(resolve, reject) {

	      speechClient.longRunningRecognize(request)
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

						const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

						//Initialize by giving our credentials
						const personalityInsights = new PersonalityInsightsV3({
							version: '2017-10-13',
							iam_apikey: process.env.PERS_KEY,
						});



						const profileParams = {
							// Get the content from the JSON file.
							content: transcription,
							content_type: 'text/plain',
							consumption_preferences: true,
							raw_scores: true,
						};

						personalityInsights.profile(profileParams)
							.then(profile => {
								console.log(JSON.stringify(profile, null, 2));
							})
							.catch(err => {
								console.log('error:', err);
							});

	        })
					.catch(err => {
			      console.error('ERROR:', err);
						reject(err)
			    });

				}) // end of Promise
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
