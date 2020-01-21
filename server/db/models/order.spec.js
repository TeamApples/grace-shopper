const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Model Validation', () => {
    describe('default value for purchased is false', () => {
      let orderInstance

      beforeEach(async () => {
        orderInstance = await Order.create({
          paymentMethod: 'VISA'
        })
      })

      // afterEach(async () => {
      //   await orderInstance.drop()
      // })

      it('returns true if the purchased is false', () => {
        expect(orderInstance.purchased).to.be.equal(false)
      })
    })
    describe('order cannot be created if payment method is not specified', () => {
      let orderInstance

      it('order cannot be created without payment method', async () => {
        try {
          orderInstance = await Order.create()
          throw new Error('order cannot be created without payment method')
        } catch (error) {
          expect(error.message).to.be.equal(
            'notNull Violation: order.paymentMethod cannot be null'
          )
        }
      })
    })
  })
})
