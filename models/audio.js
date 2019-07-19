const db = require('../db')


const db_audio = db.model('audio', {
path: {type:String},

name: {type:String}
})

module.exports = db_audio
