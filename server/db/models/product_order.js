const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('products_order', {
  productPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ProductOrder
