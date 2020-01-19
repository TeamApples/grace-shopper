import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {addProductToCart, gotCart} from '../store/cart'

// need props.total
// need handleSubmit
//need props.image

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    // console.log(props)
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.userId)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h1>Your Cart Total Is: $$$</h1>
          </div>
          <div className="cart-container">
            <h2>Shopping Cart:</h2>
            {cart.length > 0 &&
              cart.map((product, idx) => {
                return (
                  <div key={idx}>
                    <img src={product.image} className="cart-pics" />
                    <Link
                      className="product-title"
                      to={'/products/' + product.id}
                    >
                      {product.name}
                    </Link>
                    <label>Unit Price ${product.price}</label>
                    <label>Quantity: {product.quantity}</label>
                    <label>
                      Total Price: ${product.price * product.quantity}
                    </label>
                    {/* {function selectElement(id, valueToSelect) {
                      let element = document.getElementById(id)
                      element.value = valueToSelect
                    }}
                    {selectElement(selectQuantity, quantity)}} */}
                    <select id="selectQuantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="button">Remove</button>
                  </div>
                )
              })}
            {cart.length > 0 && (
              <div>
                Total Price $${' '}
                {cart.reduce(
                  (acc, currentVal) =>
                    acc + currentVal.quantity * currentVal.price,
                  0
                )}
              </div>
            )}
            <div />
          </div>
          <button type="submit">Checkout</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    loadCart: function(userId) {
      const action = gotCart(userId)
      dispatch(action)
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
/**
 * CONTAINER
 //  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
