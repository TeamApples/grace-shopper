const router = require('express').Router()
const User = require('../db/models/user')
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', async (req, res) => {
  console.log('before requser', req.user)

  const currentCart = await req.session.cart
  if (req.session.cart[0].orderId) {
    await OrderProduct.destroy({
      where: {
        orderId: currentCart[0].orderId
      }
    })
    currentCart.forEach(async product => {
      await OrderProduct.create({
        orderId: product.orderId,
        productId: product.id,
        productPrice: product.price,
        productQty: product.quantity
      })
    })
  } else {
    console.log('req user: ', req.user)
    const newCart = await Order.create({
      paymentMethod: 'null',
      userId: req.user.id
    })
    console.log('newCart: ', newCart)
    currentCart.forEach(async product => {
      await OrderProduct.create({
        orderId: newCart.id,
        productId: product.id,
        productPrice: product.price,
        productQty: product.quantity
      })
    })
  }
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
