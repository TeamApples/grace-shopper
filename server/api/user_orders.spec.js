/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const OrderProduct = db.model('order_product')
const Order = db.model('order')
const Product = db.model('product')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/:userId', () => {
    let userInstance
    let orderInstance
    let orderProductInstance
    let productInstance

    beforeEach(async () => {
      userInstance = await User.create({
        id: 1,
        isAdmin: true,
        firstName: 'John',
        lastName: 'Cho',
        phoneNumber: '123456789',
        address: 'Fullstack',
        email: 'john@gmail.com',
        password: 'abc123'
      })
      orderInstance = await Order.bulkCreate([
        {
          id: 1,
          purchased: false,
          paymentMethod: 'PayPal',
          userId: 1
        },
        {
          id: 2,
          purchased: true,
          paymentMethod: 'PayPal',
          userId: 1
        }
      ])
      productInstance = await Product.bulkCreate([
        {
          id: 1,
          name: 'MacBook Pro 13',
          price: 2150,
          inventoryQty: 4,

          description:
            'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
          image:
            'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
        },
        {
          id: 2,
          name: 'Beats Studio 3',
          price: 349,
          inventoryQty: 14,
          description:
            'NBA COLLECTION - Lakers Purple - Get closer to your music and show love for the team you rep with the Beats NBA Collection. These Beats Studio3 Wireless headphones, worn by some of your favorite players, feature your team’s authentic colors and iconic logos. The final result is a collection designed just for the fans, honoring the spirit and emotion that makes up each of the six available team options - Boston Celtics, Golden State Warriors, Houston Rockets, Los Angeles Lakers, Philadelphia 76ers, and Toronto Raptors. It’s official – the game will never sound the same. Premium sound with fine-tuned acoustics and Pure ANC Beats Studio3 Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Canceling (Pure ANC) to actively block external noise and real-time audio calibration to preserve clarity, range, and emotion. They continuously pinpoint external sounds to block while automatically',
          image:
            'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRD9PN-bWo61tw7s7BugjRCAFcFNkq5MWaOtpXdURvqQNN4pQlV6xSX4WrkIsXLGO3RXSC5aiROWYXh3SPw__D2UKzz1_y5Fa9e22LeF0tuQWoBQQVzj5gw&usqp=CAc'
        }
      ])
      orderProductInstance = await OrderProduct.bulkCreate([
        {orderId: 1, productId: 1, productQty: 5, productPrice: 100},
        {orderId: 1, productId: 2, productQty: 10, productPrice: 200},
        {orderId: 2, productId: 2, productQty: 15, productPrice: 300}
      ])
    })

    // afterEach(async () => {
    //   await userInstance.drop()
    //   await orderInstance.drop()
    //   await orderProductInstance.drop()
    // })

    // it('GET /api/users/:userId/cart', async () => {
    //   const res = await request(app).get(`/api/users/${userInstance.id}/cart`)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body.length).to.equal(2)
    // })

    // it('POST /api/users/:userId/cart', async () => {
    //   let addProduct = {...productInstance[0]}
    //   delete addProduct.dataValues.inventoryQty
    //   addProduct.dataValues.quantity = 3
    //   addProduct.dataValues.orderId = 1
    //   const res = await request(app)
    //     .post(`/api/users/${userInstance.id}/cart`)
    //     .send(addProduct)

    // })
  })
})
