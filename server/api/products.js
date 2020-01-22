const router = require('express').Router()
const {Product} = require('../db/models')
const {protect} = require('./securityUtils')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', protect, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    if (!newProduct) {
      const err = new Error('Bad Request - Product cannot be created')
      err.status = 400
      throw err
    }
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    if (!product) {
      const err = new Error('Product Not Found')
      err.status = 404
      throw err
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', protect, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', protect, async (req, res, next) => {
  try {
    const [affectedRows, updatedProduct] = await Product.update({
      returning: true,
      where: {
        id: Number(req.params.productId)
      }
    })
    if (!updatedProduct) {
      const err = new Error('Bad Request - Product not Updated')
      err.status = 400
      throw err
    }
    res.send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
