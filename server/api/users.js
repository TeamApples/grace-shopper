const router = require('express').Router()
const {User, Product, Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    console.log('this is the body', req.body)
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
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

router.delete('/:userId', async (req, res, next) => {
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

router.get('/:userId/orderHistory', async (req, res, next) => {
  try {
    console.log('userId: ', typeof req.params.userId)
    const orderHistory = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'completed'
      },
      include: [{model: Product}]
    })
    console.log('order history: ', orderHistory)
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    // await Order.findAll({
    //   where: {
    //     userId: req.params.userId,
    //     where:{status: 'completed'}
    //   },
    //   include: [{model: OrderProduct, include: [{model: Product}]}]
    // })
  } catch (err) {
    next(err)
  }
})
