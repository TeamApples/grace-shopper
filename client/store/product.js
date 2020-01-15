import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

const getSingleProduct = singleProduct => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct: singleProduct
  }
}

export const loadOneProduct = function(productId) {
  return function(dispatch) {
    fetch('/api/products/' + productId)
      .then(res => res.json())
      .then(product => {
        const action = getSingleProduct(product)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

// thunk creator
export const gotAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
