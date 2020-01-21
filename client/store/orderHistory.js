import Axios from 'axios'

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

const initialState = []

const getOrderHistory = function(orderHistory) {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory
  }
}

export const getOrderHistoryThunk = function(userId) {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/users/${userId}/orderHistory`)
      dispatch(getOrderHistory(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}

export default orderHistoryReducer
