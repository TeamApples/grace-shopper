import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {addUserThunk} from '../store/user'

export class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      phoneNumber: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addUser(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      phoneNumber: ''
    })
  }
  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
  render() {
    return (
      <SignUp
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addUser: function(user) {
      const action = addUserThunk(user)
      dispatch(action)
    }
  }
}

function SignUp(props) {
  const {handleChange, handleSubmit, state} = props

  return (
    <div>
      <h2>Apple ID</h2>
      <div className="id-wrapper">
        <div className="id-container">Create Your Apple ID</div>
      </div>
      <p>One Apple ID is all you need to access all Apple services.</p>
      <div className="singup-page-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={state.firstName}
            />
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={state.lastName}
            />
            <label htmlFor="phoneNumber">
              <small>Phone Number</small>
            </label>
            <input
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              value={state.phoneNumber}
            />
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={state.address}
            />
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={state.email}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Choose your Password</small>
            </label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={state.password}
            />
          </div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
        <a href="/auth/google">Signup with Google</a>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CreateUser)

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       const firstName = evt.target.firstName.value
//       const lastName = evt.target.lastName.value
//       const address = evt.target.address.value
//       const phone = evt.target.phone.value
//       dispatch(auth(email, password, firstName, lastName, address, phone))
//     }
//   }
// }

/**
 * PROP TYPES
 */
// SignUp.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
