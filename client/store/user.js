import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const SAVE_USER_INFO = 'SAVE_USER_INFO'
/**
 * INITIAL STATE
 */
const defaultUser = {}

const saveUser = function(user) {
  return {
    type: SAVE_USER_INFO,
    user: user
  }
}

const addUser = function(user) {
  return {
    type: ADD_USER,
    addedUser: user
  }
}
export const changeUserThunk = (userId, newInfo) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/users/${userId}/myaccount`, newInfo)
    dispatch(saveUser(data))
  }
}

export const addUserThunk = user => {
  return async dispatch => {
    const {data} = await axios.post('/api/users', user)
    dispatch(addUser(data))
  }
}
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_USER:
      return action.addedUser
    case SAVE_USER_INFO:
      return action.user
    default:
      return state
  }
}

export default userReducer
