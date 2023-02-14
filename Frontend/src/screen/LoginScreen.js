import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { loginAction, setError } from '../Action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const LoginScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
    // setEmail('')
    // setPassword('')
  }
  let { user, errors } = useSelector((state) => state.userLogin)
  useEffect(() => {
    if (user && Object.keys(user) != 0) {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <form id='submitForm'>
      <h3>Sign In</h3>
      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
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
        <button
          type='submit'
          className='btn btn-primary'
          onClick={loginHandler}
        >
          Sign In
        </button>
      </div>
      <p className='forgot-password text-right'>
        Not registered <a href='/signup'>sign up?</a>
      </p>
    </form>
  )
}

export default LoginScreen
