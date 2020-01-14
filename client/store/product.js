import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
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

const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productReducer
