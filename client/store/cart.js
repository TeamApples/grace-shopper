import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'

const cart = []

export const addProductToCart = function(product) {
  return {
    type: ADD_TO_CART,
    product
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
      console.log(data)
      dispatch(getCart(data.products))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
