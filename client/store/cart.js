import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'

const cart = []

export const addProductToCart = function(product) {
  return {
    type: ADD_TO_CART,
    product: product
  }
}

export const getCart = function(cart) {
  return {
    type: GET_CART,
    cart
  }
}

//thunk creator
export const gotCart = userId => {
  return async dispatch => {
    try {
      // IF USER IS LOGGED IN!!!!!!!
      // console.log(req.user)
      const {data} = await Axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data.products))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let isUpdated = false
      let updatedState = state.map(product => {
        if (action.product.id === product.id) {
          product.quantity += action.product.quantity
          isUpdated = true
        }
        return product
      })
      if (!isUpdated) {
        updatedState.push(action.product)
      }
      return updatedState
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
