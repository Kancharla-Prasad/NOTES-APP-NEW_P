import React from 'react'
import Credentialbtns from './Credentialbtns'
import Portfolio from './Portfolio'
import { FaSearch } from "react-icons/fa";

function Navbar({token,setToken,username,setLogoutstatus,searchquery,setSearchquery,handleSearch}) {    
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            Notes App
        </div>
        <div>
            
             {token && <div style={{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"24px"}}>
                  <input type='text' value={searchquery} onChange={e=>setSearchquery(e.target.value)} className='search-input' />
                  <FaSearch onClick={handleSearch} className='search-btn'  />
                </div>  
              }
        </div>
        {token === null ? <Credentialbtns  /> :<Portfolio username={username}  setLogoutstatus={setLogoutstatus} />}
    </div>
  )
}

export default Navbar
