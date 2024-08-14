import React from 'react'
import { Link } from 'react-router-dom'

function LoginNavbar() {
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <Link to="/" style={{color:"white"}}>Notes App </Link>
            </div>
        </div>
    )
}

export default LoginNavbar
