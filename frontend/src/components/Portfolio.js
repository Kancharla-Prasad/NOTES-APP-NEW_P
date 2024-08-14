import React from 'react'
import { getInitials } from '../utilities/ValidateEmail'

function Portfolio({username,setLogoutstatus}) {


    //function to handle logout
    const handleLogout = ()=>{
        setLogoutstatus(prevstate => !prevstate);
        localStorage.removeItem('token');
    }
    
  return (
    <div className='navbar-portfolio'>
      <div className='port-shortform'>
          {getInitials(username)}
      </div>
      <div className='port-name-logout'>
           <small style={{display:"block"}}>{username}</small>
           <button  onClick={handleLogout} className='logout-btn'>Logout</button> 
      </div>
    </div>
  )
}

export default Portfolio
