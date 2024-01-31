import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  ERROR_SET_SUCCESS,
  USER_LOGOUT,
  // API_URL,
} from '../constant'
import axios from 'axios'
axios.defaults.withCredentials = true

const registerAction =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: USER_REGISTER_START,
    })
    try {
      // const resp = await axios.post(`${API_URL}/api/users/signup`, {
      const resp = await axios.post(`/api/users/signup`, {
        name,
        email,
        password,
      })
      const user = resp.data
      console.log(user)
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: user,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      })
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: err && err.response.data.errors,
      })
    }
  }

const loginAction = (email, password) => async (dispatch, getState) => {
  dispatch({
    type: USER_LOGIN_START,
  })
  try {
    // const resp = await axios.post(`${API_URL}/api/users/signin`, {
    const resp = await axios.post(`/api/users/signin`, {
      email,
      password,
    })
    const user = resp.data
    console.log(user)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err && err.response.data.errors,
    })
  }
}
const logoutAction = () => async (dispatch, getState) => {
  // const res = await axios.get(`${API_URL}/api/users/logout`)
  const res = await axios.get(`/api/users/logout`)
  dispatch({
    type: USER_LOGOUT,
    payload: res,
  })
}

const setError = (data) => async (dispatch) => {
  dispatch({
    type: ERROR_SET_SUCCESS,
    payload: data,
  })
}
export { registerAction, loginAction, setError, logoutAction }
