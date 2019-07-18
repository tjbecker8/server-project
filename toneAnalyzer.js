// Use our Watson library.
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Require our config variables.


// The text that we want to analyze the tone of.
let text = `

`

// Turn our text into valid json.
const input = { "text": text };

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
  iam_apikey: 'to0GBbL1IzO8PmJbCtV3dPnENJq8dtwuK_CInaoAGVEK',
});



// Use our Tone Analyzer variable to analyze the tone.
toneAnalyzer.tone(params)
  .then(toneAnalysis => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
