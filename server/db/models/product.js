const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  invoiceQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isURL: true
    }
  }
})

module.exports = Product
