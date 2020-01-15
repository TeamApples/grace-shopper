import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {loadOneProduct} from '../store/product'
import {connect} from 'react-redux'
import {addProductToCart} from '../store/cart'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.onLoadSingleProduct()
  }

  handleClick() {
    this.props.addToCart(this.props.singleProduct)
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <h1>{singleProduct.name}</h1>
        <img src={singleProduct.image} />
        <h2>${singleProduct.price}</h2>
        <p>{singleProduct.description}</p>
        <button type="submit" onClick={this.handleClick}>
          Add to Cart
        </button>
      </div>
    )
  }
}
const mapStateToProps = function(state) {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = function(dispatch, urlProps) {
  return {
    onLoadSingleProduct: function() {
      const productId = urlProps.match.params.productId
      const action = loadOneProduct(productId)
      dispatch(action)
    },
    addToCart: function(product) {
      const action = addProductToCart(product)
      dispatch(action)
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default SingleProductContainer
