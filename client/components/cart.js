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
  }

  componentDidMount() {
    this.props.loadCart(this.props.match.params.userId)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const cart = this.props.cart
    console.log('props passed down to Cart Component: ', this.props)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h1>Your Cart Total Is: $$$</h1>
          </div>
          <div className="cart-container">
            <h2>Shopping Cart:</h2>
            {cart.map((product, idx) => {
              return (
                <div key={idx}>
                  <img src={product.image} className="cart-pics" />
                  <Link
                    className="product-title"
                    to={'/products/' + product.id}
                  >
                    {product.name}
                  </Link>
                  <div>${product.price}</div>
                  <button type="button">Remove</button>
                </div>
              )
            })}
            {/* // <select>
            //   <option>1</option>
            //   <option>2</option>
            //   <option>3</option>
            //   <option>4</option>
            //   <option>5</option>
            // </select> */}
            <div>Total Price $$</div>
            <div />
          </div>
          <button type="submit">Proceed to Checkout</button>
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
