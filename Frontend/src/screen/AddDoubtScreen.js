import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { addDoubtAction } from '../Action/doubtAction'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const AddDoubtScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const addDoubtHandler = (e) => {
    e.preventDefault()
    console.log('hi')
    dispatch(addDoubtAction(title, description))
  }
  let { user, errors } = useSelector((state) => state.userRegister)
  useEffect(() => {
    if (user && Object.keys(user) != 0) {
      navigate('/')
    }
  }, [navigate, user])
  return (
    <div>
      <h3 style={{ maxWidth: '600px', margin: '30px auto' }}>Raise Doubt</h3>
      <form className='doubtForm' onSubmit={addDoubtHandler}>
        <div className='mb-3'>
          <label>Title</label>
          <input
            type='text'
            className='form-control'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Description</label>
          <input
            type='text'
            className='form-control'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <ListGroup>
            {errors &&
              Object.keys(errors).map((key) =>
                errors[key] !== '' ? (
                  <ListGroup.Item variant='danger'>
                    {errors[key]}
                  </ListGroup.Item>
                ) : null
              )}
          </ListGroup>
        </div>
        <div className='d-flex justify-content-end'>
          <Button
            type='submit'
            variant='outline-secondary'
            style={{ color: 'white', background: 'black' }}
          >
            Add Doubt
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddDoubtScreen
