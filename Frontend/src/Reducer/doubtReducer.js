import {
  GET_DOUBT_SUCCESS,
  GET_DOUBT_START,
  GET_DOUBT_FAIL,
  ADD_COMMENT_SUCCESS,
} from '../constant'

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

    case ADD_COMMENT_SUCCESS:
      const doubt = state.myDoubts.filter(
        (data) => data._id === action.payload.doubt._id
      )
      doubt[0].comments.push(action.payload.newComment)
      return {
        ...state,
        myDoubts: [...state.myDoubts, doubt[0]],
      }
    default:
      return state
  }
}

export { getDoubtReducer }
