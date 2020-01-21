const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  productPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderProduct
