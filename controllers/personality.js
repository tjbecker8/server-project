require('dotenv').config();

// const googleSpeechText = require('./googleSpeechText.js')

module.exports = (transcription) => {

	//use watson library
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
}
