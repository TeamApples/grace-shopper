import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div className="navbar">
    <nav className="login-form">
      {isLoggedIn ? (
        <div className="nav-two">
          <h3 className="main-links"></h3>
          <NavLink activeClassName="active" className="main-links" to="/home">
            Apple
          </NavLink>
          <NavLink
            activeClassName="active"
            className="main-links"
            to="/products"
          >
            Shop
          </NavLink>
          <NavLink
            activeClassName="active"
            className="main-links"
            to={`/users/${userId}/cart`}
          >
            My Cart
          </NavLink>
          {/* The navbar will show these links after you log in */}
          <NavLink
            activeClassName="active"
            className="main-links"
            to={`/users/${userId}/myaccount`}
          >
            My Account
          </NavLink>
          <a href="#" onClick={handleClick} className="main-links">
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-two">
          <h3 className="main-links"></h3>
          <NavLink activeClassName="active" className="main-links" to="/home">
            Apple
          </NavLink>

          <NavLink
            activeClassName="active"
            className="main-links"
            to="loginOrSignUp"
          >
            LOGIN or SIGNUP
          </NavLink>
          <NavLink
            activeClassName="active"
            className="main-links"
            to="/products"
          >
            Shop All
          </NavLink>
          <NavLink activeClassName="active" className="main-links" to="/cart">
            My Cart
          </NavLink>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
