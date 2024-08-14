import React from 'react'
import { Link } from 'react-router-dom'

function Credentialbtns() {
  return (
    <div className='navbar-cred-btns'>
      <li><Link to='/login'  className='login-btn'>Login</Link></li>
      <li><Link to='/register' className='signup-btn'>Sign up</Link></li>
    </div>
  )
}

export default Credentialbtns
