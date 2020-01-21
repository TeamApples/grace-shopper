/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        isAdmin: true,
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '9176583948',
        address: '217 E 22nd St, NY NY 10022'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
      // expect(res.status).to.be.equal('Unauthorized')
      // expect(res.text).to.be.equal('Unauthorized Request, Admin Only Route')
    })
    it('GET /api/users/2', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
      expect(res.status).to.be.equal(401)
      expect(res.text).to.be.equal('Unauthorized Request, Admin Only Route')
    })
    // it('POST /api/users', async () => {
    //   const res = await request(app)
    //     .post('/api/users')
    //     .expect(200)
    //   console.log(res)
    //   // expect(res.status).to.be.equal('Unauthorized')
    //   // expect(res.text).to.be.equal('Unauthorized Request, Admin Only Route')
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
