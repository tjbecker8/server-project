require('dotenv').config();
const db_personality = require('./models/personalityInsights')

// const googleSpeechText = require('./googleSpeechText.js')

module.exports = (transcription) => {

return new Promise(function(resolve, reject) {
	//use watson library
	console.log('personality');
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
	    // console.log('personality',JSON.stringify(profile, null, 2));
			// db_personality.create(JSON.stringify(profile, null, 2))
			resolve(profile)
	  })
	  .catch(err => {
	    // console.log('error:', err);
			reject(err)
	  });

		})

}
