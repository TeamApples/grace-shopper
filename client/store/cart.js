const ADD_TO_CART = 'ADD_TO_CART'

const initialState = {
  cart: []
}

const addProductToCart = function(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    default:
      return state
  }
}
