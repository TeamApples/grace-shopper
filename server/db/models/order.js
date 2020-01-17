const Sequelize = require('sequelize')
const db = require('../db.js')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN, //consider using updatedAt/purchase confirmation date
    defaultValue: false
  },

  paymentMethod: {
    type: Sequelize.STRING
  }
})

module.exports = Order
