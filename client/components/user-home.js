import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {GOT_USERS} from '../store/user'
import {render} from 'enzyme'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {}

  render() {
    const {email} = props
    return (
      <div>
        <h3>Welcome, {email}</h3>
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
