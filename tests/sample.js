process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index.js')

// Messages

describe('messages', () => {

	it('should get messages from db', (done) => {
		chai.request(server).get('/api/messages').end((err, res) => {
			if (err) {
				console.log('err', err)
			} else {
				// console.log('res', res.body)
				res.should.have.property('body')
				done()
			}
		})
	})

	it('should create a message in db', (done) => {
		chai.request(server).post('/api/messages').send({
			body: 'Hello'
		}).end((err, res) => {
			if (err) {
				console.log('err', err)
			} else {
				console.log('res', res.body)
				res.should.have.property('author')
				done()
			}
		})
	})

})
