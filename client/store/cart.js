import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'

const initialState = []

export const addProductToCart = function(product) {
  return {
    type: ADD_TO_CART,
    product: product
  }
}

const getCart = function(cart) {
  return {
    type: GET_CART,
    cart
  }
}

export const checkout = function(cart) {
  return {
    type: CHECKOUT,
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
      console.log('information on cart:', data)
      dispatch(getCart(data.products))
    } catch (err) {
      console.error(err)
    }
  }
}

export const checkedOut = cart => {
  return async dispatch => {
    try {
      const {data} = await Axios.post('/api/users/guest/cart', cart)
      dispatch(checkout(data.cart))
    } catch (err) {
      console.log(err)
    }
  }
}

// export const addedProductToCart = function(productToCart, userId) {
//   return async dispatch => {
//     try {
//       const cachedCart = await Axios.get(`/api/users/${userId}/cart`)
//       console.log('get cart: ', cachedCart.data)
//       if (!cachedCart.data) {
//         const addProduct = await Axios.post(
//           `/api/users/${userId}/cart`,
//           productToCart
//         )
//         dispatch(addProductToCart(addProduct.data))
//       } else {
//         const updateProduct = Axios.put(
//           `/api/users/${userId}/cart`,
//           productToCart
//         )
//         dispatch(addProductToCart(updateProduct.data))
//       }

//     } catch (err) {
//       console.error('is it working?')
//     }
//   }
// }

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let isUpdated = false
      let updatedState = state.map(product => {
        if (action.product.id === product.id) {
          product.quantity += action.product.quantity
          isUpdated = true
        }
        return product
      })
      if (!isUpdated) {
        updatedState.push({...action.product})
      }
      return updatedState
    }
    case GET_CART:
      return action.cart
    case CHECKOUT:
      return action.cart
    default:
      return state
  }
}
