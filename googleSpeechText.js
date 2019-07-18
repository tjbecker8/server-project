require('dotenv').config();

  const _ = require('lodash');
  const speech = require('@google-cloud/speech');
  const cloudStorage = require('@google-cloud/storage');
  const fs = require('fs');
  const path = require('path');

  const speechClient = new speech.SpeechClient();

  // The path to the audio file to transcribe
  const filePath = './resources/test.WAV';

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
      };

      const request = {
        audio,
        config,
      };

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
        })
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
