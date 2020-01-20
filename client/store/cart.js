import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_STATE_PRODUCT = 'REMOVE_STATE_PRODUCT'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'

const initialState = []

//action creators
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

export const removeStateProduct = function(product) {
  return {
    type: REMOVE_STATE_PRODUCT,
    product
  }
}

// export const deleteProduct = function(product) {
//   return {
//     type: DELETE_PRODUCT,
//     product
//   }
// }

//thunk creators
export const gotCart = userId => {
  return async dispatch => {
    try {
      // IF USER IS LOGGED IN!!!!!!!

      const {data} = await Axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
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
      console.error(err)
    }
  }
}

// export const removedProduct = product => {
//   return async dispatch => {
//     try {
//       const productId = product.id
//       const {data} = await Axios.delete(`/api/users/guest/cart/${productId}`)
//       dispatch(deleteProduct(data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

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

export const addProductToCartThunk = function(productToCart, userId) {
  return async dispatch => {
    try {
      const {data} = await Axios.post(
        `/api/users/${userId}/cart`,
        productToCart
      )

      dispatch(addProductToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // let isUpdated = false
      // let updatedState = state.map(product => {
      //   if (action.product.id === product.id) {
      //     product.quantity += action.product.quantity
      //     isUpdated = true
      //   }
      //   return product
      // })
      // if (!isUpdated) {
      //   updatedState.push({...action.product})
      // }
      // return updatedState
      return action.product
    }
    case GET_CART:
      return action.cart
    case CHECKOUT:
      return action.cart
    case REMOVE_STATE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
