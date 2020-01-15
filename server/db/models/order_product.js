const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
