/* global describe beforeEach it */

// const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const {UserData} = require('../../script/seed')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: UserData[0].email,
        password: UserData[0].password,
        firstName: UserData[0].firstName,
        lastName: UserData[0].lastName,
        phoneNumber: UserData[0].phoneNumber,
        address: UserData[0].email.address
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
