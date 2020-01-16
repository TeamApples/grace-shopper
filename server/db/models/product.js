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
    type: Sequelize.STRING, //create method to convert int to decimal
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isURL: true
    },
    defaultValue:
      'https://9to5mac.com/wp-content/uploads/sites/6/2019/11/apple_kawasaki_coming_soon.jpg?quality=82&strip=all&w=1600'
  }
})
Product.beforeCreate((product, options) => {
  product.price = parseInt(product.price) / 100
})

module.exports = Product
