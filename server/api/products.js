const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await Product.findAll())
  } catch (err) {
    next(err)
  }
})
