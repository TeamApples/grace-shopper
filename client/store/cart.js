import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'

const cart = []

export const addProductToCart = function(product, quantity) {
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
      let productIdMap = new Set()
      let productIdList = cart.forEach(product => {
        productIdMap.add(product.id)
      })
      if (action.product.id) return [...state, action.product]
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
