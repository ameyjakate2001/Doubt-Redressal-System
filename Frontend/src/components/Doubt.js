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
    setComment('')
    console.log(comment)
    dispatch(addCommentAction(comment, doubt._id))
  }

  return (
    <div className='doubtCard'>
      <div className='tag'>
        {doubt.resolved === 1 ? (
          <Badge bg='success' style={{ fontSize: '10px' }}>
            Resolved
          </Badge>
        ) : (
          <Badge bg='danger' style={{ fontSize: '10px' }}>
            UnResolved
          </Badge>
        )}
      </div>
      <div className='section-1'>
        <h2>{doubt.title}</h2>
        <p>{doubt.description}</p>
        <p className='text-end'>Asked by {doubt.user_id.name}</p>
      </div>
      <hr />
      <div className='section-2'>
        <p>
          {doubt.comments.length > 0
            ? `${doubt.comments.length} Comments`
            : 'No Comment'}
        </p>

        <div className='comments'>
          {doubt.comments.map((comment, i) => (
            <div
              key={i}
              style={{
                padding: '5px',
              }}
            >
              <h5>
                <span style={{ fontWeight: 'bold' }}>
                  {comment.user_id.name}:{' '}
                </span>

                {comment.text}
              </h5>
            </div>
          ))}
        </div>
        {user && doubt.resolved === 0 && user.role === 0 ? (
          <form className='commentSubmitForm'>
            <div className='mb-3 d-flex '>
              <input
                type='text'
                className='form-control'
                placeholder='First name'
                value={comment}
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

        <hr />

        {doubt.resolved === 1 && doubt.answer_id && (
          <>
            <p>Answered By {doubt.answer_id.name}</p>
            <h5>Answer : {doubt.answer}</h5>
          </>
        )}
      </div>
    </div>
  )
}

export default Doubt
