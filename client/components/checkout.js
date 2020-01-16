import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    //   this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    //   event.preventDefault()
  }

  render() {
    //need to access cart from state
    const cart = this.props.cart
    console.log(cart)

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

          {
            //IF GUEST, NEED TO ENTER INFO, SO NEED FORM}
            //* need ONCHANGE!!
            // <label>Method of Payment</label>
            // <select>
            //     <option>Credit Card</option>
            //     <option>Debit Card</option>
            //     <option>Paypal</option>
            //     <option>Bitcoin</option>
            // </select> */}
          }
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
  return {}
}

const cartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default cartContainer
