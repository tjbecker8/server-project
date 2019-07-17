const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./db')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())







app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
})
