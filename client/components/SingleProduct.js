import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {loadOneProduct} from '../store/product'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.onLoadSingleProduct()
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <h1>{singleProduct.name}</h1>
        <img src={singleProduct.image} />
        <h2>${singleProduct.price}</h2>
        <p>{singleProduct.description}</p>
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
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default SingleProductContainer
