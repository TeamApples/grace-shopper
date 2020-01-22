import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addUserThunk} from '../store/user'

export class CreateUser extends Component {
  constructor(props) {
    super(props)
    //empty form for initial state//
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
    //Reset state after form submit //
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

//add user to DB through thunk //
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
    <div id="signup-form">
      <div className="id-wrapper">
        <div className="id-container">Create Your Apple ID</div>
      </div>
      <p>One Apple ID is all you need to access all Apple services.</p>
      <div className="signup-page-wrapper">
        <form onSubmit={handleSubmit}>
          <div id="signup-form-content">
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
          <button type="submit">SUBMIT</button>
        </form>
        <a href="/auth/google">Signup with Google</a>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CreateUser)
