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
  ADD_ANSWER_START,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAIL,
  API_URL,
} from '../constant'
import axios from 'axios'
axios.defaults.withCredentials = true

const getDoubtAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_DOUBT_START,
  })

  try {
    // const response = await axios.get(`${API_URL}/api/doubts/getDoubts`)
    const response = await axios.get(`/api/doubts/getDoubts`)
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
function addDoubtAction(title, description) {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_DOUBT_START,
    })

    try {
      // const doubt = await axios.post(`${API_URL}/api/doubts/addDoubt`, {
      const doubt = await axios.post(`/api/doubts/addDoubt`, {
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
}

const addCommentAction = (comment, doubt_id) => async (dispatch) => {
  dispatch({
    type: ADD_COMMENT_START,
  })

  try {
    // const response = await axios.post(`${API_URL}/api/doubts/addComment`, {
    const response = await axios.post(`/api/doubts/addComment`, {
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
function addAnswerAction(answer, doubt_id) {
  return async (dispatch) => {
    dispatch({
      type: ADD_ANSWER_START,
    })

    try {
      // const response = await axios.post(`${API_URL}/api/doubts/answerDoubt`, {
      const response = await axios.post(`/api/doubts/answerDoubt`, {
        answer,
        doubt_id,
      })
      dispatch({
        type: ADD_ANSWER_SUCCESS,
        payload: { doubt: response.data },
      })
    } catch (error) {
      dispatch({
        type: ADD_ANSWER_FAIL,
        payload: error && error.response.data.errors,
      })
    }
  }
}

export { getDoubtAction, addDoubtAction, addCommentAction, addAnswerAction }
