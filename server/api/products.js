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
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: Number(req.params.productId)
      }
    })
    if (!product) res.status(404).end()
    else res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', protect, (req, res, next) => {
  Product.destroy({
    where: {
      id: Number(req.params.productId)
    }
  })
    .then(() => res.json(req.params.productId))
    .catch(next)
})

router.put('/:productId', protect, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update({
      where: {
        id: Number(req.params.productId)
      }
    })
    res.send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
