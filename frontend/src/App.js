import React from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import Login from './Login'
// import Register from './Register'
// import Dashbord from './Dashbord'
// import Logout from './Logout'
import './App.css'
import Editnote from './components/Editnote'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/editnote/:noteid' element={<Editnote />} />
    </Routes>
  )
}

export default App
