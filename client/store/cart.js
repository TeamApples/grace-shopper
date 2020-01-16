import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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

const deleteProduct = function(productId, orderId) {
  return {
    type: REMOVE_FROM_CART,
    productId: Number(productId),
    orderId: Number(orderId)
  }
}

export const deleteProductThunk = function(product, order) {
  return async dispatch => {
    await Axios.delete(`/api/orders/${order.id}/${product.id}`)
    dispatch(deleteProduct(product.id, order.id))
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
    // case ADD_TO_CART:
    // let productIdMap = new Set()
    // cart.forEach(product => {
    //   productIdMap.add(product.id)
    // })
    // if (productIdMap.has(action.product.id))
    //   if (action.product.id) return [...state, action.product]
    case GET_CART:
      return action.cart
    case REMOVE_FROM_CART:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
