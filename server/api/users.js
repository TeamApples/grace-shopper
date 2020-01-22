const router = require('express').Router()
const {User, Product, Order, OrderProduct} = require('../db/models')
const {protect, protectById} = require('./securityUtils')

router.get('/', protect, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = req.body
    const user = await User.create(newUser)
    if (!user) {
      const err = new Error('Bad Request - User cannot be created')
      err.status = 400
      throw err
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//Guest Checkout Request
router.post('/guest/checkout', async (req, res, next) => {
  try {
    const newGuestOrder = await Order.create({
      purchased: true,
      userId: null
    })
    if (!newGuestOrder) {
      const err = new Error('Bad Request - Order cannot be created')
      err.status = 400
      throw err
    }
    const guestOrderRequest = req.body
    guestOrderRequest.forEach(async product => {
      await OrderProduct.create({
        productPrice: +product.price,
        productQty: +product.quantity,
        productId: product.id,
        orderId: newGuestOrder.id
      })
    })
    const emptyCart = []
    res.status(201).json(emptyCart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/checkout', protectById, async (req, res, next) => {
  try {
    const userId = req.user.id
    const findUserCart = await Order.findOne({
      where: {
        purchased: false,
        userId
      }
    })
    if (findUserCart) {
      await OrderProduct.destroy({
        where: {
          orderId: findUserCart.id
        }
      })
      req.session.cart.forEach(async product => {
        await OrderProduct.create({
          orderId: product.orderId,
          productId: product.id,
          productPrice: +product.price,
          productQty: +product.quantity
        })
      })
      await findUserCart.update({purchased: true})
    } else {
      const newUserOrder = await Order.create({
        userId,
        purchased: true
      })
      req.session.cart.forEach(async product => {
        await OrderProduct.create({
          orderId: newUserOrder.id,
          productId: product.id,
          productPrice: +product.price,
          productQty: +product.quantity
        })
      })
    }
    req.session.cart = []
    res.status(201).json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', protectById, async (req, res, next) => {
  try {
    if (!req.session.cart) {
      const findUserCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          purchased: false
        },
        include: [{model: Product}]
      })
      if (findUserCart) {
        const inCart = await OrderProduct.findAll({
          where: {
            orderId: findUserCart.id
          }
        })
        const inCartMap = {}
        inCart.forEach(order => {
          inCartMap[order.productId] = {...order}
        })
        const quantityUpdatedCart = findUserCart.products.map(product => {
          const quantityUpdatedProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: +product.price,
            quantity: +inCartMap[product.id].dataValues.productQty,
            orderId: findUserCart.id
          }
          return quantityUpdatedProduct
        })
        req.session.cart = quantityUpdatedCart
      } else {
        req.session.cart = []
      }
    }
    res.send(req.session.cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', protectById, async (req, res, next) => {
  try {
    const newProductInCart = req.body
    const userSessionCart = req.session.cart
    let updatedSessionCart
    let isQuantityUpdated = false
    const findUserCart = await Order.findOne({
      where: {
        userId: req.user.id,
        purchased: false
      }
    })
    if (findUserCart) {
      newProductInCart.orderId = findUserCart.id
      updatedSessionCart = userSessionCart.map(product => {
        const copyProduct = {...product}
        if (newProductInCart.id === copyProduct.id) {
          copyProduct.quantity += +newProductInCart.quantity
          isQuantityUpdated = true
        } else {
          copyProduct.orderId = newProductInCart.orderId
        }
        return copyProduct
      })
    } else {
      updatedSessionCart = userSessionCart.map(product => {
        const copyProduct = {...product}
        if (newProductInCart.id === copyProduct.id) {
          copyProduct.quantity += +newProductInCart.quantity
          isQuantityUpdated = true
        }
        return copyProduct
      })
    }
    if (!isQuantityUpdated) {
      updatedSessionCart.push({...newProductInCart})
    }
    req.session.cart = updatedSessionCart
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', protectById, (req, res, next) => {
  try {
    const updatedProduct = req.body
    const updatedSessionCart = req.session.cart.map(product => {
      const copyProduct = {...product}
      if (updatedProduct.product.id === copyProduct.id) {
        copyProduct.quantity = +updatedProduct.quantity
      }
      return copyProduct
    })
    req.session.cart = updatedSessionCart
    res.send(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', protectById, (req, res, next) => {
  try {
    const updatedSessionCart = req.session.cart.filter(
      product => req.body.id !== product.id
    )
    req.session.cart = updatedSessionCart
    res.send(req.session.cart)
  } catch (error) {
    next(error)
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
    const [affectedRows, newUser] = await User.update(req.body, {
      returning: true,
      plain: true,
      where: {
        id: Number(req.params.userId)
      }
    })
    if (!newUser.dataValues) {
      const err = new Error('user not found')
      err.status = 404
      throw err
    }
    res.status(201).json(newUser.dataValues)
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
    res.status(204).end()
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
    if (!orderHistory) {
      const err = new Error('Order History Not Found')
      err.status(404)
      throw err
    }
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

module.exports = router
