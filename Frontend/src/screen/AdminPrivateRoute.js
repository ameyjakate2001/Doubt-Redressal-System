import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminPrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userLogin)

  if (user && user.role === 1) {
    return children
  }

  return <Navigate to='/' />
}

export default AdminPrivateRoute
