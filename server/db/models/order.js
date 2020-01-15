const Sequelize = require('sequelize')
const db = require('../db.js')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'cart',
      'processing',
      'shipped',
      'cancelled',
      'completed'
    ),
    defaultValue: 'cart'
  },
  shippingMethod: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
