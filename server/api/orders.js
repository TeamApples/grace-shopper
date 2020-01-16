const router = require('express').Router()
const {Order} = require('../db/models')
const {protect} = require('./securityUtils')

router.get('/', protect, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
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
