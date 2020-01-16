import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store/user'

class MyAccount extends Component {
  componentDidMount() {
    this.props.loadMe()
  }

  render() {
    return (
      <div id="user_account">
        <div className="user_details">
          <h2> Account Details </h2>
          <h3>User Email: </h3>
          <p>{this.props.user.email}</p>
          <h3>User Address: </h3>
          <p>{this.props.user.address}</p>
          <h3>User Phone Number: </h3>
          <p>{this.props.user.phoneNumber}</p>
          <Link to="/myaccount/edit">Edit Info</Link>
        </div>
        <div>
          <div className="user_details">
            <h2>Order History</h2>
          </div>
        </div>
      </div>
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
    }
  }
}

const MyAccountContainer = connect(mapToState, mapDispatchToProps)(MyAccount)

export default MyAccountContainer
