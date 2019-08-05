const db_fullAnalysis = require('../models/fullAnalysis')
const jwt = require('jsonwebtoken')
const _ =require('lodash')


let mostTones =
findMostTones = (array) => {
	var arr1=array;
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
		for (var j=i; j<arr1.length; j++)
		{
			if (arr1[i] === arr1[j])
			m++;
			if (mf<m)
			{
				mf=m;
				item = arr1[i];
			}
		}
		m=0;
	}
	 mostTones = item
}



let mostkeyword = ''
findMostKeywords = (array) => {
	var arr1=array;
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
		for (var j=i; j<arr1.length; j++)
		{
			if (arr1[i] === arr1[j])
			m++;
			if (mf<m)
			{
				mf=m;
				item = arr1[i];
			}
		}
		m=0;
	}
	mostkeyword = item
}


let mostPersonality =
findMostpersonality = (array) => {
	var arr1=array;
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
		for (var j=i; j<arr1.length; j++)
		{
			if (arr1[i] === arr1[j])
			m++;
			if (mf<m)
			{
				mf=m;
				item = arr1[i];
			}
		}
		m=0;
	}
	 mostPersonality = item
}

let mostLike =
findMostLike = (array) => {
	var arr1=array;
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
		for (var j=i; j<arr1.length; j++)
		{
			if (arr1[i] === arr1[j])
			m++;
			if (mf<m)
			{
				mf=m;
				item = arr1[i];
			}
		}
		m=0;
	}
	 mostLike = item
}


let mostUnlike =
findMostUnlike = (array) => {
	var arr1=array;
	var mf = 1;
	var m = 0;
	var item;
	for (var i=0; i<arr1.length; i++)
	{
		for (var j=i; j<arr1.length; j++)
		{
			if (arr1[i] === arr1[j])
			m++;
			if (mf<m)
			{
				mf=m;
				item = arr1[i];
			}
		}
		m=0;
	}
	// console.log('item', item);
	 mostUnlike = item
}










module.exports = (req, res) => {

	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) =>{
		if (decoded) {
			// console.log(decoded._id);
			let author = decoded._id


	db_fullAnalysis.find({author: decoded._id}).sort('date').select().populate({
		path: 'author',
		select: 'name email'
	}).then((data) => {

		// console.log(data[0]);
		// create calc

let size = _.size(data)
let keywords = []
data.map((c) => {
			 keywords.push(c.keywords)
		})
		let flatKey = _.flatten(keywords)
		console.log(flatKey);
		findMostKeywords(flatKey)


let tones = []
data.map((c) => {
			c.document_tone.tones.map((t)=>{
				return tones.push(t.tone_name)
			})
			return 'hello'
		})
findMostTones(tones)


let wordCount = []
data.map((c) => {
			return wordCount.push(c.word_count)
			})
let add = _.sum(wordCount)


let personality = []
data.map((c) => {
			return personality.push(c.personality)
		})



let array = data
let likley = []
array.forEach((a) => {
					a.consumption_preferences.forEach((c)=>{
						c.consumption_preferences.forEach((s) => {
							if (s.score === 1) {
								likley.push(s.name)
							}
						})
					})
				})
findMostLike(likley)

let unlikley = []
array.forEach((a) => {
						a.consumption_preferences.forEach((c)=>{
							c.consumption_preferences.forEach((s) => {
								if (s.score === 0) {
									unlikley.push(s.name)
								}
							})
						})
					})
findMostUnlike(unlikley)

let personality_total = []
array.forEach((a) => {
							a.personality.forEach((c)=>{
								if (c.percentile > 0.5) {
									personality_total.push(c.name)
								}
							})
						})
findMostpersonality(personality_total)





let calc = {
	size: size,
	keyword: mostkeyword,
	tone: mostTones,
	wordTotal: add,
	mostLike: mostLike,
	mostUnlike: mostUnlike,
	mostPersonality: mostPersonality,
	author: data[0].author
}


console.log('calc', calc);
		res.json({
			data: data,
			calc: calc
		})
	}).catch((err)=>{
		res.send(err)
	})
	}
})

}
