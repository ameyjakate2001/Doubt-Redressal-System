import React, { useState, useEffect } from 'react'
import { registerAction, setError } from '../Action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const RegisterScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerHandler = (e) => {
    e.preventDefault()
    dispatch(registerAction(name, email, password))
    // setName('')
    // setEmail('')
    // setPassword('')
  }
  let { user, errors } = useSelector((state) => state.userRegister)
  useEffect(() => {
    if (user && Object.keys(user) != 0) {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <form id='submitForm' onSubmit={registerHandler}>
      <h3>Sign Up</h3>

      <div>
        <ListGroup className='mb-3'>
          {errors &&
            Object.keys(errors).map((key) =>
              errors[key] !== '' ? (
                <ListGroup.Item variant='danger'>{errors[key]}</ListGroup.Item>
              ) : null
            )}
        </ListGroup>
      </div>
      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
      </div>
      <p className='forgot-password text-right'>
        Already registered <a href='/signin'>sign in?</a>
      </p>
    </form>
  )
}

export default RegisterScreen
