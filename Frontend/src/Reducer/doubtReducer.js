import { GET_DOUBT_SUCCESS, GET_DOUBT_START, GET_DOUBT_FAIL } from '../constant'

const getDoubtReducer = (state = { errors: {} }, action) => {
  switch (action.type) {
    case GET_DOUBT_START:
      return {
        ...state,
        loading: true,
      }

    case GET_DOUBT_SUCCESS:
      return { loading: false, myDoubts: action.payload }
    case GET_DOUBT_FAIL:
      return { loading: false, errors: action.payload }

    default:
      return state
  }
}

export { getDoubtReducer }
