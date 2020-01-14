import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

// need props.total
// need handleSubmit
//need props.image

class Cart extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <div>
            <h1>Your Cart Total Is: {props.total}</h1>
            <button type="submit">Submit</button>
          </div>

          <div>
            <h2>Shopping Cart:</h2>
            <div>{props.image}</div>
            <div>{props.name}</div>
            <div>Quantity:</div>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
            <div>{props.price}</div>
            <div />
          </div>
        </form>
      </div>
    )
  }
}

export default App

/**
 * CONTAINER
 //  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
