// Use our Watson library.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Require our config variables.
var config = require('./config');

// The text that we want to analyze the tone of.
var text = "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. \“Whenever you feel like criticizing any one,\” he told me, \“just remember that all the people in this world haven’t had the advantages that you’ve had.\"";

// Turn our text into valid json.
var input = { "text": text };

// The format that the tone analyzer needs.
var params =
        {
        'tone_input': input,
        'content_type': 'application/json'
        };

// Initialize the Tone Analyzer by giving it our credentials.
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: '{apikey}',
});



// Use our Tone Analyzer variable to analyze the tone.
tone_analyzer.tone(params, function(error, response)
        {
        // There's an error.
        if (error)
                {
                console.log('Error:', error);
                }
        // No error, we got our tone result.
        else
                {
                // The tone of the text, as determined by watson.
                var tone = JSON.stringify(response, null, 2)

                // Output Watson's tone analysis to the console.
                console.log("The tone analysis for \'" + text + "\' is:\n");
                console.log(tone);
                }
        });
