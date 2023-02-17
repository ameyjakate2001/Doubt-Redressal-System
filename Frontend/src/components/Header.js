import React from 'react'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../Action/userAction'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.userLogin)

  const logoutHandler = () => {
    dispatch(logoutAction())
  }

  return (
    <div class='header'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {user ? (
          <>
            {user.role === 0 && (
              <li>
                <Link to='/addDoubt'>Raise Doubt</Link>
              </li>
            )}

            {user.role === 1 && (
              <li>
                <Link to='/solveDoubt'>Solve Doubt</Link>
              </li>
            )}
          </>
        ) : null}
      </ul>
      <div className='buttons'>
        {user ? (
          <>
            <Badge bg='info' style={{ fontSize: '20px' }}>
              {user.name}
            </Badge>
            <Button variant='outline-secondary' onClick={logoutHandler}>
              Logout
            </Button>
          </>
        ) : (
          <Link to='/signin'>
            <Button variant='outline-secondary' className='btn'>
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
