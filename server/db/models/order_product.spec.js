const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('order_product')
const Order = db.model('order')

describe('Order Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Product Model Validation', () => {
    describe('order product cannot be created if product price is not specified', () => {
      let orderProductInstance
      let orderInstance

      it('order cannot be created without product price', async () => {
        try {
          orderInstance = await Order.create({paymentMethod: 'VISA'})
          orderProductInstance = await OrderProduct.create({
            productQty: 1,
            productId: 1,
            orderId: orderInstance.id
          })
          throw new Error('order cannot be created without product price')
        } catch (error) {
          expect(error.message).to.be.equal(
            'notNull Violation: order_product.productPrice cannot be null'
          )
        }
      })
    })

    describe('order product cannot be created if product qty is not specified', () => {
      let orderProductInstance
      let orderInstance

      it('order cannot be created without product qty', async () => {
        try {
          orderInstance = await Order.create({paymentMethod: 'VISA'})
          orderProductInstance = await OrderProduct.create({
            productPrice: 1,
            productId: 1,
            orderId: orderInstance.id
          })
          throw new Error('order cannot be created without product qty')
        } catch (error) {
          expect(error.message).to.be.equal(
            'notNull Violation: order_product.productQty cannot be null'
          )
        }
      })
    })
  })
})
