import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  ERROR_SET_SUCCESS,
} from '../constant'

const registerReducer = (state = { user: {}, errors: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_START:
      return {
        ...state,
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        errors: {},
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        errors: action.payload,
      }

    default:
      return state
  }
}
const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        errors: action.payload,
      }
    case USER_LOGOUT: {
      return {}
    }
    default:
      return state
  }
}

export { registerReducer, loginReducer }
