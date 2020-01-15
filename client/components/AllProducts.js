import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {gotAllProducts} from '../store/product'
import {connect} from 'react-redux'

class AllProducts extends Component {
  componentDidMount() {
    this.props.onLoadProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h2 className="shop-title">Shop All Products</h2>
        <div className="product-view">
          {Array.isArray(products) &&
            products.map(product => {
              return (
                <ul key={product.id} className="product">
                  <li>
                    <Link to={'/products/' + product.id}>{product.name}</Link>
                    <img src={product.image} />
                    <h2>${product.price}</h2>
                    <p>{product.description}</p>
                    <button type="button">Buy Now</button>
                  </li>
                </ul>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onLoadProducts: function() {
      const action = gotAllProducts()
      dispatch(action)
    }
  }
}

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllProducts
)

export default AllProductsContainer
