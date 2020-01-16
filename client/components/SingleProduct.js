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
    const singleProduct = this.props.singleProduct
    let numProduct = document.getElementById('selectQuantity').value
    if (singleProduct.quantity in singleProduct) {
      singleProduct.quantity += numProduct
    } else {
      this.props.singleProduct.quantity = +numProduct
    }
    //const quantity = selected.options[selected.selectedIndex].value
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
          <label>Quantity:</label>
          <select id="selectQuantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="button" onClick={this.handleClick}>
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
    addToCart: function(product, quantity) {
      const action = addProductToCart(product, quantity)
      dispatch(action)
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default SingleProductContainer
