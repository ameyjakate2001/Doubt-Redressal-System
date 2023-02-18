import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userLogin)

  if (user) {
    if (user.role === 1) {
      return <Navigate to='/' />
    } else {
      return children
    }
  }

  return <Navigate to='/signup' />
}

export default PrivateRoute
