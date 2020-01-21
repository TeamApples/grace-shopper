/* eslint-disable complexity */
import Axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_STATE_PRODUCT = 'REMOVE_STATE_PRODUCT'
const EDIT_CART = 'EDIT_CART'
const LOAD_CART_FROM_STORAGE = 'LOAD_CART_FROM_STORAGE'

const initialState = []

//action creators
export const addProductToCart = function(cart, user) {
  return {
    type: ADD_TO_CART,
    cart,
    user
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

export const removeStateProduct = function(product, userId) {
  return {
    type: REMOVE_STATE_PRODUCT,
    product,
    userId
  }
}

export const editCart = function(product, quantity, userId) {
  return {
    type: EDIT_CART,
    product,
    quantity,
    userId
  }
}

export const loadCartFromStorage = function(cart) {
  return {
    type: LOAD_CART_FROM_STORAGE,
    cart
  }
}

//thunk creators
export const gotCart = userId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const checkedOut = (cart, userId) => {
  return async dispatch => {
    try {
      if (userId) {
        const {data} = await Axios.post(`/api/users/${userId}/checkout`, cart)
        dispatch(checkout(data))
      } else {
        const {data} = await Axios.post('/api/users/guest/checkout', cart)
        dispatch(checkout(data))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

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

export const removeStateProductThunk = function(product, userId) {
  return async dispatch => {
    try {
      const {data} = await Axios.delete(`/api/users/${userId}/cart`, {
        data: product
      })
      dispatch(removeStateProduct(data, userId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const editCartThunk = function(product, quantity, userId) {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/users/${userId}/cart`, {
        product,
        quantity
      })
      dispatch(editCart(data, quantity, userId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (action.user) {
        return action.cart
      } else {
        let isUpdated = false
        let updatedState = state.map(product => {
          if (action.cart.id === product.id) {
            product.quantity += action.cart.quantity
            isUpdated = true
          }
          return product
        })
        if (!isUpdated) {
          updatedState.push({...action.cart})
        }
        localStorage.setItem('myCart', JSON.stringify(updatedState))
        return updatedState
      }
    }
    case GET_CART:
      return action.cart
    case LOAD_CART_FROM_STORAGE:
      return action.cart
    case CHECKOUT: {
      localStorage.setItem('myCart', JSON.stringify([]))
      return action.cart
    }

    case REMOVE_STATE_PRODUCT: {
      if (action.userId) {
        return action.product
      } else {
        let updatedState = state.filter(
          product => product.id !== action.product.id
        )
        localStorage.setItem('myCart', JSON.stringify(updatedState))
        return updatedState
      }
    }
    case EDIT_CART: {
      if (action.userId) {
        return action.product
      } else {
        const updatedState = state.map(product => {
          if (action.product.id === product.id) {
            product.quantity = action.quantity
          }
          return product
        })
        localStorage.setItem('myCart', JSON.stringify(updatedState))
        return updatedState
      }
    }
    default:
      return state
  }
}
