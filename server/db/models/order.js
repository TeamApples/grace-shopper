const Sequelize = require('sequelize')
const db = require('../db.js')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'pending',
      'processing',
      'shipped',
      'cancelled',
      'completed'
    ),
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
