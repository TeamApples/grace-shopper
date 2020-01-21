import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  gotCart,
  checkedOut,
  removeStateProduct,
  removeStateProductThunk,
  editCart,
  editCartThunk,
  loadCartFromStorage
} from '../store/cart'
import {OrderSuccess} from '../Toasts'
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
    } else {
      let cartFromStorage = localStorage.getItem('myCart')
      if (cartFromStorage) {
        cartFromStorage = JSON.parse(cartFromStorage)
        this.props.loadCartFromStorage(cartFromStorage)
      }
    }
  }

  selectQuantity(int) {
    let intArray = []
    for (let i = 1; i <= int; i++) {
      intArray.push(i)
    }
    return intArray
  }

  handleChange(product) {
    const quantity = +document.getElementById(`${product.name}${product.id}`)
      .value
    this.props.editQuantity(product, quantity, this.props.match.params.userId)
  }

  handleRemoveState(product) {
    this.props.removeStateProduct(product, this.props.match.params.userId)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkout(this.props.cart, this.props.match.params.userId)
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
          <div id="btn-container">
            <OrderSuccess />
          </div>
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
                    <label>
                      Unit Price $
                      {price.toLocaleString('en-IN', {
                        maximumSignificantDigits: 3
                      })}
                    </label>

                    <label>
                      $
                      {(price * product.quantity).toLocaleString('en-IN', {
                        maximumSignificantDigits: 3
                      })}
                    </label>
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
                {cart
                  .reduce(
                    (acc, currentVal) =>
                      acc + currentVal.quantity * currentVal.price * 100,
                    0
                  )
                  .toLocaleString('en-IN', {
                    maximumSignificantDigits: 3
                  })}
              </div>
            )}
            <div />
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
    loadCartFromStorage: function(cart) {
      const action = loadCartFromStorage(cart)
      dispatch(action)
    },
    checkout: function(cart, userId) {
      const action = checkedOut(cart, userId)
      dispatch(action)
    },
    removeStateProduct: function(product, userId) {
      if (userId) {
        const action = removeStateProductThunk(product, userId)
        dispatch(action)
      } else {
        const action = removeStateProduct(product)
        dispatch(action)
      }
    },
    editQuantity: function(product, quantity, userId) {
      if (userId) {
        const action = editCartThunk(product, quantity, userId)
        dispatch(action)
      } else {
        const action = editCart(product, quantity)
        dispatch(action)
      }
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
