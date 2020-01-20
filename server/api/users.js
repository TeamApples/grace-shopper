const router = require('express').Router()
const {User, Product, Order, OrderProduct} = require('../db/models')
const {protect, protectById} = require('./securityUtils')

router.get('/', protect, async (req, res, next) => {
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

//DO WE NEED TO PROTECT THIS?
router.post('/guest/cart', async (req, res, next) => {
  try {
    const newGuestOrder = await Order.create({
      purchased: true,
      paymentMethod: null,
      userId: null
    })
    req.body.forEach(async product => {
      await OrderProduct.create({
        productPrice: product.price,
        productQty: product.quantity,
        productId: product.id,
        orderId: newGuestOrder.id
      })
    })
    res.json({cart: []})
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async function(req, res, next) {
  if (!req.session.cart) {
    const existingCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        purchased: false
      },
      include: [{model: Product}]
    })
    if (existingCart) {
      const productsInCart = await OrderProduct.findAll({
        where: {
          orderId: existingCart.id
        }
      })
      const hashMap = {}
      productsInCart.forEach(order => {
        hashMap[order.productId] = order
      })
      const formattedCart = existingCart.products.map(product => {
        const formattedProduct = {
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,
          price: +product.price,
          quantity: hashMap[product.id].productQty,
          orderId: existingCart.id
        }
        return formattedProduct
      })

      req.session.cart = formattedCart

      res.send(req.session.cart)
    } else {
      req.session.cart = []
      res.send(req.session.cart)
    }
  } else {
    const cart = await req.session.cart
    res.send(cart)
  }
})

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

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const orderIdFound = await Order.findOne({
      where: {
        userId: req.user.id,
        purchased: false
      }
    })
    if (orderIdFound) {
      req.body.orderId = orderIdFound.id

      const existingCart = await req.session.cart
      let isUpdated = false
      let updatedState = existingCart.map(product => {
        if (req.body.id === product.id) {
          product.quantity += req.body.quantity
          isUpdated = true
        } else {
          product.orderId = req.body.orderId
        }
        return product
      })
      if (!isUpdated) {
        updatedState.push({...req.body})
      }
      req.session.cart = updatedState
    } else {
      const existingCart = await req.session.cart
      let isUpdated = false
      let updatedState = existingCart.map(product => {
        if (req.body.id === product.id) {
          product.quantity += req.body.quantity
          isUpdated = true
        }
        return product
      })
      if (!isUpdated) {
        updatedState.push({...req.body})
      }
      req.session.cart = updatedState
    }
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const existingCart = await req.session.cart
    console.log('req body for update: ', req.body)
    const updatedState = existingCart.map(product => {
      const copyProduct = {...product}
      if (req.body.product.id === copyProduct.id) {
        copyProduct.quantity = req.body.quantity
      }
      return copyProduct
    })
    console.log('updatedState: ', updatedState)
    req.session.cart = updatedState
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const existingCart = await req.session.cart
    const updatedCart = existingCart.filter(
      product => req.body.id !== product.id
    )
    req.session.cart = updatedCart
    res.send(req.session.cart)
  } catch (error) {
    next(error)
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

router.put('/:userId/myaccount', protectById, async (req, res, next) => {
  try {
    const [user, newuser] = await User.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id: Number(req.params.userId)
      }
    })
    if (!newuser.dataValues) {
      const err = new Error('user not found')
      err.status = 404
      throw err
    }
    res.json(newuser.dataValues)
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
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', protectById, async (req, res, next) => {
  try {
    if (req.params.userId !== undefined) {
      const pendingOrder = await Order.findOne({
        where: {
          userId: req.params.userId,
          purchased: false
        },
        include: [{model: Product}]
      })
      res.json(pendingOrder)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
