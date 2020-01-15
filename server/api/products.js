const router = require('express').Router()
const {Product} = require('../db/models')

//create utils file for frequently used functions
//add security

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: Number(req.params.productId)
    }
  })
    .then(() => res.json(req.params.productId))
    .catch(next)
})

router.put('/:productId', async (req, res, next) => {
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
