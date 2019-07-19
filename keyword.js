const unirest = require('unirest')
require('dotenv').config();


// const googleSpeechText = require('./googleSpeechText.js')

module.exports = (transcription) => {

unirest.post("https://textanalysis-keyword-extraction-v1.p.rapidapi.com/keyword-extractor-text")
.header("X-RapidAPI-Host", "textanalysis-keyword-extraction-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", process.env.X_RAPIDAPI_Key)
.header("Content-Type", "application/x-www-form-urlencoded")
.send(`text=${transcription}`)
.send("wordnum=5")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
}
