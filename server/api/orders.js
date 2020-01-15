const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
//mount post method on the user routes
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    if (!newOrder) {
      const err = new Error('This request cannot be processed')
      err.status = 404
      throw err
    }
    res.status(201).json(newOrder)
  } catch (err) {
    next(err)
  }
})

//mount method on the user routes

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if (!order) {
      const err = new Error('404 Page Not Found')
      err.status = 404
      throw err
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// router.put('/:orderId', async (req, res, next) => {
//   try {
//     // req.body should only contain order status info.
//     const updatedOrder = await Order.update(req.body, {
//       returning: true,
//       where: {
//         id: req.params.orderId
//       }
//     })
//     res.json(updatedOrder)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
