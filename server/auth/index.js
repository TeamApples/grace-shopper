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
  const currentCart = req.session.cart
  if (!currentCart.length) {
    const existingUserCart = await Order.findOne({
      where: {
        purchased: false,
        userId: req.user.id
      }
    })
    if (existingUserCart) {
      await OrderProduct.destroy({
        where: {
          orderId: existingUserCart.id
        }
      })
      await Order.destroy({
        where: {
          purchased: false,
          userId: req.user.id
        }
      })
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (currentCart[0].orderId) {
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
      const newCart = await Order.create({
        userId: req.user.id
      })
      currentCart.forEach(async product => {
        await OrderProduct.create({
          orderId: newCart.id,
          productId: product.id,
          productPrice: product.price,
          productQty: product.quantity
        })
      })
    }
  }
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  // if(!req.session.cart.length && JSON.parse(localStorage.getItem('myCart')).length) {
  //   req.session.cart = JSON.parse(localStorage.getItem('myCart'))
  //   localStorage.setItem('myCart', JSON.stringify([]))
  // }
  // else if (req.session.cart.length)
  res.json(req.user)
})

router.use('/google', require('./google'))
