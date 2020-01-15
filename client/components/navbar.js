import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <nav className="login-form">
      {isLoggedIn ? (
        <div className="nav-two">
          <h3 className="main-links"> Apple</h3>
          <NavLink
            activeClassName="active"
            className="main-links"
            to="/products"
          >
            Shop
          </NavLink>
          <NavLink activeClassName="active" className="main-links" to="/cart">
            My Cart
          </NavLink>
          {/* The navbar will show these links after you log in */}
          <NavLink activeClassName="active" className="main-links" to="/home">
            Home
          </NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-two">
          <h3 className="main-links"> Apple</h3>
          <NavLink activeClassName="active" className="main-links" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" className="main-links" to="/signup">
            Sign Up
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
          <NavLink activeClassName="active" className="main-links" to="/home">
            Home
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
