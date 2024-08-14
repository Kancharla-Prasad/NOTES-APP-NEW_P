import React from 'react'

function Logout() {
    const handleLogout = ()=>{
        localStorage.removeItem('token');
    }
  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Logout
