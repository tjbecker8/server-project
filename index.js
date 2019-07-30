const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()
require('./db')
const app = express()

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './resources')
  },
	filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +'.wav')
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.post('/full', upload.single('file'), require('./fullAnalysis'))
app.get('/full/:id', require('./controllers/get_analysis'))

app.get('/api/analysis', require('./controllers/get_multiple_analysis'))


app.post('/api/personality', require('./controllers/post_personality'))

app.get('/api/users', require('./controllers/get_users'))

app.post('/api/signup', require('./controllers/signup'))
app.post('/api/login', require('./controllers/login'))

app.post('/api/upload', require('./controllers/uploadFile'))

// app.get('/api/users', require('./controllers/get_users'))



app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
