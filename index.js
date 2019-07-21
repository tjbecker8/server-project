const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const fullAnalysis = require('./fullAnalysis')

require('dotenv').config()
require('./db')
const app = express()




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.post('/full', require('./fullAnalysis'))


app.post('/api/personality', require('./controllers/post_personality'))


app.post('/api/signup', require('./controllers/signup'))
app.post('/api/login', require('./controllers/login'))

app.post('/api/upload', require('./controllers/uploadFile'))

// app.get('/api/users', require('./controllers/get_users'))



app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
