// Use our Watson library.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Require our config variables.
var config = require('./config');

// The text that we want to analyze the tone of.
var text = `
Wish I could get a little un-drunk so I could un-call you
At five in the morning, I would un-fuck you
Honestly, this party's over
Everyone here should have gone home
But I'm afraid of being sober
'Cause the first thing I do when I'm alone
I start touching myself to the photos that you used to send me
I should have deleted, but kept it a secret
Is that crazy to do?
So I squeeze out the lime on the ice of my drink
And the juice hits the cuts on my fingers
It still doesn't burn as much as the thought of you
Wish I could get a little un-drunk so I could un-call you
At five in the morning, I would un-fuck you
But some things you can't undo
I wish I could un-kiss the room full of strangers
So I could un-spite you, un-lose my temper
But somethings you can't undo
And one of them's you
I'm afraid to turn the lights on
I don't want to face this rebound
Is it weird if I come over?
I want to but I know that she's around
So I'm touching myself to the photos that you used to send me
I should have deleted, but kept it a secret
Is that crazy to do? (Haha)
Oh, I'm hungry and wasted and my hands are shaking
I shouldn't be cooking, be spilling hot water
It still doesn't burn as much as the thought of you
Wish I could get a little un-drunk so I could un-call you
At five in the morning, I would un-fuck you
But some things you can't undo
I wish I could un-kiss the room full of strangers
So I could un-spite you, un-lose my temper
But somethings you can't undo
And one of them's you
Been through every emotion
Right now I'm sad and broken
Like the bottles on the floor, but I'm too buzzed to clean them up
Wish I could get a little un-drunk
So I could, I could un-love you
Wish I could get a little un-drunk so I could un-call you
At five in the morning, I would un-fuck you
But some things you can't undo
I wish I could un-kiss the room full of strangers
So I could un-spite you, un-lose my temper
But somethings you can't undo
And one of them's you
You, you
Wish I could un-love you
You, you, you
Wish I could un-call you
You, you, you
Wish I could un-fuck you
You
Wish I could un-love you
`

// Turn our text into valid json.
var input = { "text": text };

// The format that the tone analyzer needs.
var params =
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

// tone_analyzer.tone(params, function(error, response)
//         {
//         // There's an error.
//         if (error)
//                 {
//                 console.log('Error:', error);
//                 }
//         // No error, we got our tone result.
//         else
//                 {
//                 // The tone of the text, as determined by watson.
//                 var tone = JSON.stringify(response, null, 2)
//
//                 // Output Watson's tone analysis to the console.
//                 console.log("The tone analysis for \'" + text + "\' is:\n");
//                 console.log(tone);
//                 }
//         });
