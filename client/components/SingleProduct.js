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
      <div id="single_product">
        <div id="product_image">
          <img src={singleProduct.image} />
        </div>
        <div id="product_info">
          <h1>{singleProduct.name}</h1>
          <h3>Price: </h3>
          <p>${singleProduct.price}</p>
          <h3>Details: </h3>
          <p>{singleProduct.description}</p>
          {/* <label>Quantity:</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select> */}
          <button type="submit" onClick={this.handleClick}>
            Add to Cart
          </button>
        </div>
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
