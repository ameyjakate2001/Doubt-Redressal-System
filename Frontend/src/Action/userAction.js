import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  ERROR_SET_SUCCESS,
} from '../constant'
import axios from 'axios'
const registerAction =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: USER_REGISTER_START,
    })
    try {
      const resp = await axios.post('/api/users/signup', {
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
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: err && err.response.data.errors,
      })
    }
  }

const setError = (data) => async (dispatch) => {
  dispatch({
    type: ERROR_SET_SUCCESS,
    payload: data,
  })
}
export { registerAction, setError }
