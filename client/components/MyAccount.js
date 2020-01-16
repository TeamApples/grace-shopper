import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {gotAllProducts} from '../store/product'
import {connect} from 'react-redux'

class MyAccount extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <h1> Account Details </h1>
          <h2>Sign In Information</h2>
          <h3>Sign In Email address</h3>
          <h3>password **add option to adit password</h3>
        </div>
        <div>
          <h2> first and last name</h2>
          <h2>Address info</h2>
          <h2>Phone number</h2>
        </div>
        <div>
          <h1>order history</h1>
        </div>
      </div>
    )
  }
}

export default MyAccount
