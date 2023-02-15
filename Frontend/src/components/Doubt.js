import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addCommentAction } from '../Action/doubtAction'
const Doubt = ({ doubt }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const commentHandler = (e) => {
    e.preventDefault()
    dispatch(addCommentAction(comment, doubt._id))
  }

  return (
    <div className='doubtCard'>
      <div className='section-1'>
        <h2>{doubt.title}</h2>
        <p>{doubt.description}</p>
        <p>Asked by {doubt.user_id.name}</p>
      </div>
      <hr />
      <div className='section-2'>
        <div className='comments'>
          {doubt.comments.map((comment) => (
            <h5>{comment.text}</h5>
          ))}
        </div>
        <p>{doubt.comments.length} comments</p>
        <form className='commentSubmitForm'>
          <div className='mb-3 d-flex '>
            <input
              type='text'
              className='form-control'
              placeholder='First name'
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type='submit'
              variant='outline-secondary'
              style={{ color: 'white', background: 'black' }}
              onClick={commentHandler}
            >
              Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Doubt
