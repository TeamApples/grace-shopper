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
      let {data} = await Axios.get(`/api/users/${userId}/cart`)
      // if (userId) {

      let userCart = data
      let guestCart = JSON.parse(localStorage.getItem('myCart'))

      if (guestCart.length) {
        //if there is a guest cart
        if (userCart.length) {
          //if there is a user cart

          // let copyUserCart = [...userCart]
          for (let i = 0; i < guestCart.length; i++) {
            for (let j = 0; j < userCart.length; j++) {
              if (guestCart[i].id === userCart[j].id) {
                userCart[j].quantity += guestCart[i].quantity
                guestCart = guestCart.filter(
                  product => product.id !== guestCart[i].id
                )
              }
            }
          }
          if (guestCart.length) {
            userCart.push(guestCart)
          }
          dispatch(getCart(userCart))
        } else {
          userCart.push(guestCart[i])
          let {data} = await Axios.post(
            `/api/users/${userId}/cart`,
            guestCart[i]
          )
          dispatch(getCart(data))
        }

        localStorage.setItem('myCart', JSON.stringify([]))
      } else {
        dispatch(getCart(guestCart))
      }
    } catch (err) {
      // } else {
      //   dispatch(getCart(data))
      // }
      // if (data.length) {
      //   if (JSON.parse(localStorage.getItem('myCart')).length) {

      //     const inLocalStorage = JSON.parse(localStorage.getItem('myCart'))//array
      //     const localStorageMap = {}
      //     inLocalStorage.forEach((product) => {
      //       localStorageMap[product.id] = {...product}
      //     })
      //     console.log("localStorageMap: ", localStorageMap)
      //     const mergeCart = data.map(product => {
      //       let formattedProduct = {...product}
      //       if (formattedProduct.id in localStorageMap) {
      //         formattedProduct.quantity += localStorageMap[product.id].quantity
      //         delete localStorageMap[product.id]
      //       }
      //       return formattedProduct
      //     })
      //     for (let key in localStorageMap) {
      //       if (localStorageMap.hasOwnProperty(key)) {
      //         mergeCart.push(localStorageMap[key])
      //       }
      //     }
      //     let lastToReturn
      //     mergeCart.forEach(async (product, idx) => {
      //       if (idx === mergeCart.length - 1) {
      //         lastToReturn = await Axios.post(`/api/users/${userId}/cart`, product)
      //       }
      //       else {
      //         await Axios.post(`/api/users/${userId}/cart`, product)
      //       }
      //     })
      //     localStorage.setItem('myCart', JSON.stringify([]))
      //     dispatch(getCart(lastToReturn.data))
      //   }
      //   else {
      //     dispatch(getCart(data))
      //   }
      // }
      // else {
      //   // eslint-disable-next-line no-lonely-if
      //   if (JSON.parse(localStorage.getItem('myCart')).length) {
      //     const formattedLocalCart = JSON.parse(localStorage.getItem('myCart')).map((product) => {
      //       const formattedProduct = {...product}
      //       return formattedProduct
      //     })
      //     let lastToReturn;
      //     formattedLocalCart.forEach(async (product, idx) => {
      //       if (idx === formattedLocalCart.length - 1) {
      //         lastToReturn = await Axios.post(`/api/users/${userId}/cart`, product)
      //       }
      //       else {
      //         await Axios.post(`/api/users/${userId}/cart`, product)
      //       }
      //     })
      //     localStorage.setItem('myCart', JSON.stringify([]))
      //     dispatch(getCart(lastToReturn.data))
      //   }
      //   else {
      //     dispatch(getCart(data))
      //   }
      // }
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
