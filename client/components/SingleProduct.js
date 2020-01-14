import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {gotSingleProduct} from '../store/product'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  componentDidMount() {
    console.log('inside single product component')
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

const mapDispatchToProps = function(dispatch) {
  return {
    onLoadSingleProduct: function(singleProductId) {
      const action = gotSingleProduct(singleProductId)
      dispatch(action)
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default SingleProductContainer
