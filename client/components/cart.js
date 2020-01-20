import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {
  addProductToCart,
  gotCart,
  checkedOut,
  removeStateProduct,
  editCart
} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemoveState = this.handleRemoveState.bind(this)
    this.selectQuantity = this.selectQuantity.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.userId) {
      this.props.loadCart(this.props.match.params.userId)
    }
  }

  selectQuantity(int) {
    let intArray = []
    for (let i = 1; i <= int; i++) {
      intArray.push(i)
    }
    return intArray
  }

  async handleChange(product) {
    const quantity = +document.getElementById(`${product.name}${product.id}`)
      .value
    await this.props.editQuantity(product, quantity)
  }

  handleRemoveState(product) {
    this.props.removeStateProduct(product)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkout(this.props.cart)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-view">
          <div className="cart-main-title">
            <h1>Thank you for shopping with us</h1>
          </div>
          <p className="cart-second-title">
            Get free shipping and free returns on all orders.
          </p>

          <div className="cart-container">
            <h2>Review Your Cart:</h2>
            {cart.length > 0 &&
              cart.map((product, idx) => {
                let price = product.price * 100
                return (
                  <div key={idx} className="cart-items-container">
                    <div className="cart-image-container">
                      <img src={product.image} className="cart-pics" />
                    </div>
                    <Link
                      className="cart-product-title"
                      to={'/products/' + product.id}
                    >
                      {product.name}
                    </Link>
                    <label>Unit Price ${price}</label>
                    <label className="rs-quantity-selector">
                      Quantity: {product.quantity}
                    </label>
                    <label>${price * product.quantity}</label>
                    {/* {function selectElement(id, valueToSelect) {
                      let element = document.getElementById(id)
                      element.value = valueToSelect
                    }}
                    {selectElement(selectQuantity, quantity)}} */}
                    <select
                      id={`${product.name}${product.id}`}
                      onChange={() => this.handleChange(product)}
                    >
                      {this.selectQuantity(product.quantity).map(int => {
                        return +int === product.quantity ? (
                          <option
                            value={`${int}`}
                            key={`single${product.name}${int}`}
                            selected
                          >
                            {int}
                          </option>
                        ) : (
                          <option value={`${int}`}>{int}</option>
                        )
                      })}
                    </select>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => this.handleRemoveState(product)}
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
            {cart.length > 0 && (
              <div className="cart-total">
                Total ${''}
                {cart.reduce(
                  (acc, currentVal) =>
                    acc + currentVal.quantity * currentVal.price * 100,
                  0
                )}
              </div>
            )}
            <div />
          </div>
          <div id="btn-container">
            <button type="submit" id="checkout-btn">
              Checkout
            </button>
          </div>
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
    },
    checkout: function(cart) {
      const action = checkedOut(cart)
      dispatch(action)
    },
    removeStateProduct: function(product) {
      const action = removeStateProduct(product)
      dispatch(action)
    },
    editQuantity: function(product, quantity) {
      const action = editCart(product, quantity)
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
