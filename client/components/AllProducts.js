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
      <div id="all_products">
        <h2 className="shop-title">Shop All Products</h2>
        <div className="product-view">
          {Array.isArray(products) &&
            products.map(product => {
              return (
                <ul key={product.id} className="product">
                  <li className="product-flex">
                    <Link
                      className="product-title"
                      to={'/products/' + product.id}
                    >
                      {product.name}
                    </Link>
                    <Link to={`/products/` + product.id}>
                      <img src={product.image} />
                    </Link>
                    <h2>
                      $
                      {(product.price / 100)
                        .toFixed(2)
                        .toLocaleString('en-IN', {
                          maximumSignificantDigits: 3
                        })}
                    </h2>
                    <p>{product.description}</p>
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
