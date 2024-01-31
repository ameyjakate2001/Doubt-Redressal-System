import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentAction } from '../Action/doubtAction'

const Doubt = ({ doubt }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { user } = useSelector((state) => state.userLogin)

  const renderTag = () => (
    <div className='tag'>
      <Badge
        bg={doubt.resolved === 1 ? 'success' : 'danger'}
        style={{ fontSize: '10px' }}
      >
        {doubt.resolved === 1 ? 'Resolved' : 'Unresolved'}
      </Badge>
    </div>
  )

  const renderDoubtInfo = () => (
    <div className='doubt-info'>
      {renderDoubtTitle()}
      <p>{doubt.description}</p>
      <p className='text-end'>Asked by {doubt.user_id.name}</p>
    </div>
  )

  const renderDoubtTitle = () => <h2>{doubt.title}</h2>

  const renderComments = () => (
    <>
      <p>
        {doubt.comments.length > 0
          ? doubt.comments.length === 1
            ? `${doubt.comments.length} Comment`
            : `${doubt.comments.length} Comments`
          : 'No Comment'}
      </p>
      <div className='comments'>{doubt.comments.map(renderComment)}</div>
    </>
  )

  const renderComment = (comment) => (
    <h5 key={comment._id}>
      <span>{comment.user_id.name}: </span>
      {comment.text}
    </h5>
  )

  const renderCommentForm = () => (
    <form className='commentSubmitForm' onSubmit={commentHandler}>
      <div className='mb-3 d-flex'>
        <input
          type='text'
          className='form-control'
          placeholder='Type your comment'
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type='submit'
          variant='outline-secondary'
          style={{ color: 'white', background: 'black' }}
        >
          Comment
        </Button>
      </div>
    </form>
  )

  const renderAnswer = () => (
    <>
      <p>Answered By {doubt.answer_id.name}</p>
      <span className='ml-2'>
        Answer:
        <h3 className='d-inline-block ml-5 text-wrap'>{doubt.answer}</h3>
      </span>
    </>
  )

  const commentHandler = (e) => {
    e.preventDefault()
    dispatch(addCommentAction(comment, doubt._id))
  }

  return (
    <div className='doubtCard'>
      {renderTag()}
      <div className='doubt-details'>
        {renderDoubtInfo()}
        <hr />
        {renderComments()}
        {user && !doubt.resolved && user.role === 0 && renderCommentForm()}
        <hr />
        {doubt.resolved === 1 && doubt.answer_id && renderAnswer()}
      </div>
    </div>
  )
}

export default Doubt
