const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  productPrice: {
    type: Sequelize.DECIMAL, //create method to convert int to decimal
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

OrderProduct.beforeCreate((product, options) => {
  product.productPrice = product.productPrice / 100
})

module.exports = OrderProduct
