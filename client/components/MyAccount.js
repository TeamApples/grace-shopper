import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, addUserThunk, changeUserThunk} from '../store/user'
import Axios from 'axios'

class MyAccount extends Component {
  constructor(props) {
    super(props)
    // console.log('the props are', props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.success = this.success.bind(this)
  }

  componentDidMount() {
    this.props.loadMe()
  }

  handleSubmit(event) {
    const userId = this.props.user.id
    const email = document.getElementById('emailInput').value
    const address = document.getElementById('addressInput').value
    const phone = document.getElementById('phoneInput').value
    const user = {
      email: email,
      phone: phone,
      address: address
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
    return (
      this.props.user && (
        <div id="user_account">
          <div className="user_details">
            <form onSubmit={this.handleSubmit}>
              <h2> Account Details </h2>
              <label htmlFor="email">Email: </label>
              <input
                id="emailInput"
                onChange={this.handleChange}
                placeholder={`${this.props.user.email}`}
              />
              <label htmlFor="address">Address: </label>
              <input
                id="addressInput"
                onChange={this.handleChange}
                placeholder={`${this.props.user.address}`}
              />
              <label htmlFor="phoneNumber">
                Phone Number: (numbers only, no extra characters){' '}
              </label>
              <input
                id="phoneInput"
                onChange={this.handleChange}
                placeholder={`${this.props.user.phoneNumber}`}
              />

              <button type="button" onClick={this.handleSubmit}>
                Save Changes
              </button>
            </form>
          </div>
          <div>
            <div className="user_details">
              <h2>Order History</h2>
            </div>
          </div>
        </div>
      )
    )
  }
}

const mapToState = state => {
  return {
    user: state.user
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
    }
  }
}

const MyAccountContainer = connect(mapToState, mapDispatchToProps)(MyAccount)

export default MyAccountContainer
