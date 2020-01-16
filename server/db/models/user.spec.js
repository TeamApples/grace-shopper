/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const {UserData} = require('../../../script/seed')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: UserData[0].email,
          password: UserData[0].password,
          firstName: UserData[0].firstName,
          lastName: UserData[0].lastName,
          phoneNumber: UserData[0].phoneNumber,
          address: UserData[0].email.address
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('mypassword')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('apassword')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
