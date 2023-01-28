import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div class='header'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/raiseDoubt'>Raise a doubt</Link>
        </li>
        <li>
          <Link to='/solveDoubt'>Solve doubt</Link>
        </li>
      </ul>
      <div className='buttons'>
        <Button variant='outline-secondary'>
          <a href='/signin'>Login</a>
        </Button>
        <Button variant='outline-secondary'>Logout</Button>
      </div>
    </div>
  )
}

export default Header
