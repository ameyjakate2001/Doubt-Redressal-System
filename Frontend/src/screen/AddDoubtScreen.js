import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { addDoubtAction } from '../Action/doubtAction'
import { useDispatch } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const AddDoubtScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const handleInputChange = (e, setter) => {
    setter(e.target.value)
  }

  const validateInputs = () => title.trim() === '' || description.trim() === ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setError('Fields cannot be empty')
    } else {
      dispatch(addDoubtAction(title, description)).then(() => {
        navigate('/')
      })
      setError(null)
    }
  }

  const renderError = () => (
    <ListGroup>
      {error && <ListGroup.Item variant='danger'>{error}</ListGroup.Item>}
    </ListGroup>
  )

  const renderInput = (label, value, onChange) => (
    <div className='mb-3'>
      <label>{label}</label>
      <input
        type='text'
        className='form-control'
        value={value}
        placeholder={label}
        onChange={(e) => handleInputChange(e, onChange)}
      />
    </div>
  )

  return (
    <div>
      <h3 style={{ maxWidth: '600px', margin: '30px auto' }}>Raise Doubt</h3>
      <form className='doubtForm' onSubmit={handleSubmit}>
        {renderInput('Title', title, setTitle)}
        {renderInput('Description', description, setDescription)}

        <div>{renderError()}</div>
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
