const ADD_TO_CART = 'ADD_TO_CART'

const cart = []

export const addProductToCart = function(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('we are in action')
      return [...state, action.product]
    default:
      return state
  }
}
