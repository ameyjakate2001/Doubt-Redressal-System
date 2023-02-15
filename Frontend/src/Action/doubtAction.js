import {
  ADD_DOUBT_SUCCESS,
  ADD_DOUBT_START,
  ADD_DOUBT_FAIL,
  GET_DOUBT_SUCCESS,
  GET_DOUBT_START,
  GET_DOUBT_FAIL,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
} from '../constant'
import axios from 'axios'
const getDoubtAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_DOUBT_START,
  })

  try {
    const response = await axios.get('/api/doubts/getUnresolved')
    const doubt = response.data
    dispatch({
      type: GET_DOUBT_SUCCESS,
      payload: doubt,
    })
  } catch (err) {
    dispatch({
      type: GET_DOUBT_FAIL,
      payload: err && err.response.data.errors,
    })
  }
}
const addDoubtAction = (title, description) => async (dispatch, getState) => {
  dispatch({
    type: ADD_DOUBT_START,
  })

  try {
    const doubt = await axios.post('/api/doubts/addDoubt', {
      title,
      description,
    })
    console.log(doubt)
    dispatch({
      type: ADD_DOUBT_SUCCESS,
      payload: doubt,
    })
  } catch (err) {
    dispatch({
      type: ADD_DOUBT_FAIL,
      payload: err && err.response.data.errors,
    })
  }
}
const addCommentAction = (comment, doubt_id) => async (dispatch) => {
  dispatch({
    type: ADD_COMMENT_START,
  })

  try {
    const response = await axios.post('/api/doubts/addComment', {
      text: comment,
      doubt_id,
    })
    const newComment = response.data.comments[response.data.comments.length - 1]
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: { newComment, doubt: response.data },
    })
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error && error.response.data.errors,
    })
  }
}

export { getDoubtAction, addDoubtAction, addCommentAction }
