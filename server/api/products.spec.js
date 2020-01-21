/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const Product = db.model('product')
const Order = db.model('order')
const {ProductData} = require('../../script/seed')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productOneName = 'MACBOOK'

    beforeEach(() => {
      return Product.create({
        id: 10,
        name: 'MACBOOK',
        price: 2170,
        inventoryQty: 4,

        description:
          'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
        image:
          'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('MACBOOK')
    })

    describe('/api/products/:productId', () => {
      const productOneName = 'MacBook Pro 13'

      beforeEach(() => {
        return Product.create({
          name: 'MacBook Pro 13',
          price: 2150,
          inventoryQty: 4,

          description:
            'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
          image:
            'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
        })
      })

      it('GET /api/products/:productId', async () => {
        const res = await request(app)
          .get('/api/products/1')
          .expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.name).to.be.equal(productOneName)
      })
    })
  })

  // describe('POST /:productId', () => {
  //   it('creates a new product', async () => {
  //     const res = await agent
  //       .post('/api/products')
  //       .send({
  //         id: 10,
  //         name: 'Beats Studio 3',
  //         price: 349,
  //         inventoryQty: 14,
  //         description:
  //           'NBA COLLECTION - Lakers Purple - Get closer to your music and show love for the team you rep with the Beats NBA Collection. These Beats Studio3 Wireless headphones, worn by some of your favorite players, feature your team’s authentic colors and iconic logos. The final result is a collection designed just for the fans, honoring the spirit and emotion that makes up each of the six available team options - Boston Celtics, Golden State Warriors, Houston Rockets, Los Angeles Lakers, Philadelphia 76ers, and Toronto Raptors. It’s official – the game will never sound the same. Premium sound with fine-tuned acoustics and Pure ANC Beats Studio3 Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Canceling (Pure ANC) to actively block external noise and real-time audio calibration to preserve clarity, range, and emotion. They continuously pinpoint external sounds to block while automatically',
  //         image:
  //           'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRD9PN-bWo61tw7s7BugjRCAFcFNkq5MWaOtpXdURvqQNN4pQlV6xSX4WrkIsXLGO3RXSC5aiROWYXh3SPw__D2UKzz1_y5Fa9e22LeF0tuQWoBQQVzj5gw&usqp=CAc'
  //       })
  //       .expect(200)

  //     expect(res.body.message).to.equal('Created successfully')
  //     expect(res.body).to.not.be.an('undefined')
  //     expect(res.body.name).to.equal('Beats Studio 3')
  //   })

  //   // This one should fail with a 500 because we don't set the article.content
  //   it('does not create a new product without content', () => {
  //     return agent
  //       .post('/api/products')
  //       .send({
  //         name: 'This Product Should Not Be Allowed'
  //       })
  //       .expect(500)
  //   })

  // Check if the articles were actually saved to the database
  // it('saves the product to the DB', async () => {
  //   await agent
  //     .post('/api/products')
  //     .send({
  //       name: 'Beats Studio 3',
  //       price: 349,
  //       inventoryQty: 14,
  //       description:
  //         'NBA COLLECTION - Lakers Purple - Get closer to your music and show love for the team you rep with the Beats NBA Collection. These Beats Studio3 Wireless headphones, worn by some of your favorite players, feature your team’s authentic colors and iconic logos. The final result is a collection designed just for the fans, honoring the spirit and emotion that makes up each of the six available team options - Boston Celtics, Golden State Warriors, Houston Rockets, Los Angeles Lakers, Philadelphia 76ers, and Toronto Raptors. It’s official – the game will never sound the same. Premium sound with fine-tuned acoustics and Pure ANC Beats Studio3 Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Canceling (Pure ANC) to actively block external noise and real-time audio calibration to preserve clarity, range, and emotion. They continuously pinpoint external sounds to block while automatically',
  //       image:
  //         'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRD9PN-bWo61tw7s7BugjRCAFcFNkq5MWaOtpXdURvqQNN4pQlV6xSX4WrkIsXLGO3RXSC5aiROWYXh3SPw__D2UKzz1_y5Fa9e22LeF0tuQWoBQQVzj5gw&usqp=CAc'
  //     })
  //     .expect(200)

  //   const foundProduct = await Product.findOne({
  //     where: {name: 'Beats Studio 3'}
  //   })

  //   expect(foundProduct).to.exist // eslint-disable-line no-unused-expressions
  //   expect(foundProduct.price).to.equal(349)
  // })
  // })
})
