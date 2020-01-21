import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {GOT_USERS} from '../store/user'
import {render} from 'enzyme'
import MyAccount from './MyAccount'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {}

  render() {
    const firstName = this.props.user.firstName
    const lastName = this.props.user.lastName
    return (
      <div className="home-page">
        <h1>
          Welcome, {firstName} {lastName}!
        </h1>
        <img
          src="https://wallpaperplay.com/walls/full/7/b/d/323597.jpg"
          className="home-pic"
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
