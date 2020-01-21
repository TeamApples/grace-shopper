/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Order = db.model('order')
// const {ProductData} = require('../../script/seed')

describe('attributes definition', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('TEST', () => {
    let createdProduct
    beforeEach(async () => {
      createdProduct = await Product.create({
        name: 'MacBook Pro 13',
        price: 2150,
        inventoryQty: 4,
        description:
          'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.',
        image:
          'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
      })
    })

    it('includes `name`, `price`, `inventoryQty`, `description`, `image` fields', async () => {
      expect(createdProduct.name).to.equal('MacBook Pro 13')
      expect(createdProduct.price).to.equal(2150)
      expect(createdProduct.inventoryQty).to.equal(4)
      expect(createdProduct.description).to.equal(
        'MacBook Pro elevates the notebook to a whole new level of performance and portability. Wherever your ideas take you, you’ll get there faster than ever with high‑performance processors and memory, advanced graphics, blazing‑fast storage, and more — all in a compact 3-pound package.'
      )
      expect(Product.image).to.equal(
        'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
      )
    })

    it('requires all fields', async () => {
      createdProduct.name = null

      let result, error
      try {
        result = await createdProduct.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('description and image can handle long `content`', async () => {
      let exampleContent =
        'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.'

      const result = await Product.create({
        name: 'MacBook Pro 13',
        price: 2150,
        inventoryQty: 4,
        description: exampleContent,
        image:
          'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6-4JRDvcEsQaMgwAbq_B791FT41mQqIDIHG87EmfITgyTbqa78bTg28vrKd0Ld6nej-hCjkSoKlOAY4JbirkhDahHg2hJ5luzFY6FW2N1kWxhNyHMERKP3w&usqp=CAc'
      })
      expect(result).to.be.an('object')
      expect(result.name).to.equal('MacBook Pro 13')
      expect(result.description).to.equal(exampleContent)
    })
  })
})
