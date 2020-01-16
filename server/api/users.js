const router = require('express').Router()
const {User, Product, Order, OrderProduct} = require('../db/models')
const {protect, protectById} = require('./securityUtils')

router.get('/', protect, async function(req, res, next) {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.get('/:userId/:orderId', protectById, async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.orderId)
//     if (!order) {
//       const err = new Error('404 Page Not Found')
//       err.status = 404
//       throw err
//     }
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/:userId/orders', protectById, async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', protectById, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', protectById, async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.userId
      }
    })
    if (!user) {
      const err = new Error('user not found')
      err.status = 404
      throw err
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', protectById, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.status(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orderHistory', protectById, async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      where: {
        userId: req.params.userId,
        purchased: true
      },
      include: [{model: Product}]
    })
    console.log('order history: ', orderHistory)
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', protectById, async (req, res, next) => {
  try {
    const pendingOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        purchased: false
      },
      include: [{model: Product}]
    })
    res.json(pendingOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
