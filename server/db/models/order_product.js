const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  productPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productQty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderProduct
