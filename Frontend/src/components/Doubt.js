import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentAction } from '../Action/doubtAction'
const Doubt = ({ doubt }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { user } = useSelector((state) => state.userLogin)

  const commentHandler = (e) => {
    e.preventDefault()
    dispatch(addCommentAction(comment, doubt._id))
  }

  return (
    <div className='doubtCard'>
      <div className='tag'>
        {doubt.resolved === 1 && (
          <Badge bg='success' style={{ fontSize: '10px' }}>
            Resolved
          </Badge>
        )}
      </div>
      <div className='section-1'>
        <h2>{doubt.title}</h2>
        <p>{doubt.description}</p>
        <p>Asked by {doubt.user_id.name}</p>
      </div>
      <hr />
      <div className='section-2'>
        <div className='comments'>
          {doubt.comments.map((comment) => (
            <>
              <h5>
                <span>{comment.user_id.name}: </span>

                {comment.text}
              </h5>
            </>
          ))}
        </div>
        <p>{doubt.comments.length} comments</p>
        {user && doubt.resolved === 0 && user.role === 0 ? (
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
        ) : null}
      </div>
    </div>
  )
}

export default Doubt
