import React from 'react'

const LoginScreen = () => {
  return (
    <form id='submitForm'>
      <h3>Sign In</h3>
      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
        />
      </div>
      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>
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
