import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, changeUserThunk} from '../store/user'
import {getOrderHistoryThunk} from '../store/orderHistory'
import {UserSaveSuccess} from '../Toasts'
import {Link} from 'react-router-dom'

class MyAccount extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.success = this.success.bind(this)
  }

  componentDidMount() {
    this.props.loadMe()
    this.props.loadOrderHistory(this.props.match.params.userId)
  }

  handleSubmit(event) {
    const userId = this.props.user.id
    const email = document.getElementById('emailInput').value
    const address = document.getElementById('addressInput').value
    const phone = document.getElementById('phoneInput').value
    const firstName = document.getElementById('firstNameInput').value
    const lastName = document.getElementById('lastNameInput').value

    const user = {
      email: email,
      phone: phone,
      address: address,
      firstName: firstName,
      lastName: lastName
    }
    event.preventDefault()
    try {
      this.props.saveChanges(userId, user)
    } catch (error) {
      console.error(error)
    }
  }
  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
  success() {
    return <div>Your info was updated successfully</div>
  }
  render() {
    const orderHistory = this.props.orderHistory
    return (
      this.props.user && (
        <div id="user_account">
          <div className="user_details">
            <h2> Account Details </h2>
            <form onSubmit={this.handleSubmit}>
              <div className="input-fields">
                <label htmlFor="firstName">First Name: </label>
                <input
                  id="firstNameInput"
                  onChange={this.handleChange}
                  placeholder={`${this.props.user.firstName}`}
                />
              </div>
              <div className="input-fields">
                <label htmlFor="lastName">Last Name: </label>
                <input
                  id="lastNameInput"
                  onChange={this.handleChange}
                  placeholder={`${this.props.user.lastName}`}
                />
              </div>
              <div className="input-fields">
                <label htmlFor="email">Email: </label>
                <input
                  id="emailInput"
                  onChange={this.handleChange}
                  placeholder={`${this.props.user.email}`}
                />
              </div>
              <div className="input-fields">
                <label htmlFor="address">Address: </label>
                <input
                  id="addressInput"
                  onChange={this.handleChange}
                  placeholder={`${this.props.user.address}`}
                />
              </div>
              <div className="input-fields">
                <label htmlFor="phoneNumber">
                  Phone Number: (numbers only, no extra characters){' '}
                </label>
                <input
                  id="phoneInput"
                  onChange={this.handleChange}
                  placeholder={`${this.props.user.phoneNumber}`}
                />
              </div>
              <div>
                <UserSaveSuccess />
              </div>
            </form>
          </div>
          <div>
            <div className="order-history">
              <h2>{this.props.user.firstName}, Here's Your Order History</h2>

              {orderHistory.map(order => {
                return (
                  <div key={order.id} className="account-items-container">
                    <div id="outer-order">
                      <h3 className="order-number-details">
                        ORDER PLACED {order.updatedAt.slice(0, 10)}
                      </h3>
                      <h3 className="order-number-details">
                        TOTAL $
                        {order.products
                          .reduce(
                            (acc, currentVal) =>
                              acc +
                              currentVal.order_product.productQty *
                                currentVal.order_product.productPrice /
                                100,
                            0
                          )
                          .toFixed(2)}
                      </h3>
                      <h3 className="order-number-details">
                        SHIP TO {this.props.user.firstName}
                      </h3>
                      <h3 className="order-number-details">
                        ORDER #{order.id}
                      </h3>
                    </div>

                    {order.products.map(product => {
                      return (
                        <div
                          key={product.name + order.id}
                          className="account-items-container"
                        >
                          <Link
                            to={`/products/${product.id}`}
                            id="buy-it-again"
                          >
                            Buy it again
                          </Link>
                          <img id="order-pics" src={product.image} />
                          <div> {product.name}</div>
                          <div>Qty: {product.order_product.productQty}</div>
                          <div>
                            Price: ${' '}
                            {(
                              product.order_product.productPrice *
                              product.order_product.productQty /
                              100
                            ).toFixed(2)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              <div />
            </div>
          </div>
        </div>
      )
    )
  }
}

const mapToState = state => {
  return {
    user: state.user,
    orderHistory: state.orderHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMe: function() {
      dispatch(me())
    },
    saveChanges: function(userId, newInfo) {
      const action = changeUserThunk(userId, newInfo)
      dispatch(action)
    },
    loadOrderHistory: function(userId) {
      const action = getOrderHistoryThunk(userId)
      dispatch(action)
    }
  }
}

const MyAccountContainer = connect(mapToState, mapDispatchToProps)(MyAccount)

export default MyAccountContainer
