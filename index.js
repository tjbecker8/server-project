const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./db')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.post('/api/personality', require('./controllers/post_personality'))

// app.get('/api/tweets', require('./controllers/get_tweets'))
// app.post('/api/tweets', require('./controllers/post_tweet'))
// app.patch('/api/tweets/:id', require('./controllers/patch_tweet'))
//
// app.get('/api/hashtag', require('./controllers/get_hashtag'))
// app.post('/api/hashtag', require('./controllers/post_hashtag'))
//
app.post('/api/signup', require('./controllers/signup'))
app.post('/api/login', require('./controllers/login'))
// app.get('/api/users', require('./controllers/get_users'))



app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
