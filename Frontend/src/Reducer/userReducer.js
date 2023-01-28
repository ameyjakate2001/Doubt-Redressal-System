import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
        ...state,
        loading: false,
        errors: action.payload,
      }
    default:
      return state
  }
}

export { registerReducer }
