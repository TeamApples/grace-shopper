import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProductsContainer from './components/AllProducts'
import SingleProductContainer from './components/SingleProduct'
import LogInOrSignUp from './components/LogOrSign'
import SignUp from './components/SignUpForm'
import MyAccountContainer from './components/MyAccount'
import CartContainer from './components/cart'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/newSignUp" component={SignUp} />
        <Route exact path="/loginOrSignUp" component={LogInOrSignUp} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProductsContainer} />
        <Route
          exact
          path="/products/:productId"
          component={SingleProductContainer}
        />
        <Route
          exact
          path="/cart"
          render={routeProps => (
            <CartContainer {...routeProps} className="fuck-you" />
          )}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/users/:userId/myaccount"
              render={routeProps => <MyAccountContainer {...routeProps} />}
            />
            <Route
              exact
              path="/users/:userId/cart"
              render={routeProps => <CartContainer {...routeProps} />}
            />
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
